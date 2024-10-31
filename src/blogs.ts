import type { Context } from 'hono';
import { raw } from 'hono/html';
import { marked } from 'marked';
import { randomHash } from './account';
import { renderHTML, renderPostEditor } from './htmltools';
import { sanitizeHTML, truncate } from './utils';

export const handleBlog = async (c: Context) => {
    const subdomain = c.get('SUBDOMAIN');

    const userId = c.get('USER_ID') || -1;
    const userLoggedIn = !!c.get('USER_LOGGED_IN');

    const batch = await c.env.DB.batch([
        c.env.DB.prepare(`
        SELECT title, user_id, slug
        FROM blogs
        WHERE blogs.slug = ?`).bind(subdomain),

        c.env.DB.prepare(`
        SELECT posts.post_id, posts.title, posts.slug, posts.pub_date, posts.status
        FROM posts
        JOIN blogs ON blogs.blog_id = posts.blog_id
        WHERE blogs.slug = ?
        ORDER BY posts.pub_date DESC`).bind(subdomain),
    ]);

    if (!batch[0].results.length) return c.notFound();
    const blog = batch[0].results[0];
    const posts = batch[1].results;

    let list = `
        <header class="blog-header">
            <h1>${blog.title}</h1>
            
            <p class="blog-description">Observations on technology, literature, and the spaces between. Written sporadically, with care.</p>
        </header>
        
    `;

    if (userLoggedIn && userId === blog.user_id) {
        list += `
        <details class="quick-draft">
            <summary>Quick draft</summary>
            
            <form style="margin-bottom: 3em;" method="POST">
            <div style="margin-bottom:1em;">
                <input type="text" id="post-title" name="post-title" hidden>
            </div>
            <div style="margin-bottom:1em;">
                <textarea id="txt" name="post-content" placeholder="Quick draft..." rows=10></textarea>

            </div>
            <div class="buttons">
                <input type="submit" name="action" value="Quick save">
                <input type="submit" name="action" value="Continue editing in full">
            </div>

            </form>
        </details>
        `;
    }

    const formatDate = (date: Date) => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${monthNames[date.getMonth()]} ${date.getDate().toString().padStart(2, '0')}, ${date.getFullYear()}`;
    };

    list += `<section class="posts">`;
    for (const post of posts) {
        if (post.status !== 'public' && (!userLoggedIn || userId !== blog.user_id)) continue;
        const postDate = formatDate(new Date(post.pub_date));
        let status_block = '';
        if (userLoggedIn && userId === blog.user_id && post.status === 'draft') {
            status_block = ' <span class="label label-inline">draft</span>';
        }
        list += `
            <a href="/${post.slug}" class="post-item">
                <time class="post-date">${postDate}</time>
                <h2 class="post-title">${post.title}${status_block}</h2>
            </a>
            `;
    }
    list += '</section>';

    return c.html(renderHTML(`${blog.title}`, raw(list), userLoggedIn));
};

export const handleBlogPOST = async (c: Context) => {
    const subdomain = c.get('SUBDOMAIN');
    const userId = c.get('USER_ID') || -1;

    if (!c.get('USER_LOGGED_IN')) return c.text('Unauthorized', 401);

    // get blog_id, user_id, feed_id for the given subdomain
    const blogDBEntry = await c.env.DB.prepare('SELECT blogs.blog_id, blogs.user_id FROM blogs WHERE blogs.slug = ?')
        .bind(subdomain)
        .first();
    if (!blogDBEntry) return c.notFound();

    const blog = blogDBEntry;
    if (userId !== blog.user_id) return c.text('Unauthorized', 401);

    // ok, user is logged in and is the owner of the blog
    const body = await c.req.parseBody();
    let title = body['post-title'].toString();
    const postContent = body['post-content'].toString();

    const newPostContent = postContent ? postContent : 'empty draft';

    if (!title.length) title = truncate(newPostContent, 45);
    let postContentHTML = await marked.parse(newPostContent);
    postContentHTML = await sanitizeHTML(postContentHTML);

    try {
        let item_slug = generate_slug(title);

        const slug_check = await c.env.DB.prepare('SELECT * FROM posts WHERE blog_id = ? AND slug = ?')
            .bind(blog.blog_id, item_slug)
            .run();

        if (slug_check.results.length) {
            item_slug += `-${randomHash(8)}`;
            if (item_slug === generate_slug(title)) {
                throw new Error('Unable to generate a unique slug after 10 attempts');
            }
        }

        const pub_date = new Date().toISOString();

        const status = body.action.toString().toLowerCase() === 'publish' ? 'public' : 'draft';

        await c.env.DB.prepare(
            'INSERT INTO posts (blog_id, title, slug, content_md, content_html, pub_date, status) values (?, ?, ?, ?, ?, ?, ?)',
        )
            .bind(blog.blog_id, title, item_slug, newPostContent, postContentHTML, pub_date, status)
            .run();

        if (body.action.toString().toLowerCase() === 'quick save') return c.redirect('/');
        if (body.action.toString().toLowerCase() === 'continue editing in full')
            return c.redirect(`/${item_slug}/edit`);
        return c.redirect(`/${item_slug}`);
    } catch (err) {
        return c.text(err);
    }
};

export const handlePostSingle = async (c: Context) => {
    const subdomain = c.get('SUBDOMAIN');
    const userId = c.get('USER_ID') || -1;
    const userLoggedIn = !!c.get('USER_LOGGED_IN');
    const post_slug = c.req.param('post_slug');

    const postDBEntry = await c.env.DB.prepare(
        `
            SELECT posts.title, posts.content_html, blogs.user_id, posts.pub_date, posts.status, blogs.title as blog_title
            FROM posts
            JOIN blogs ON blogs.blog_id = posts.blog_id
            WHERE blogs.slug = ? AND posts.slug = ?
        `,
    )
        .bind(subdomain, post_slug)
        .run();

    const post = postDBEntry.results[0];
    if (!post) return c.notFound();
    if ((!userLoggedIn || userId !== post.user_id) && post.status !== 'public') return c.notFound();

    const date_format_opts: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const post_date = new Date(post.pub_date).toLocaleDateString('en-UK', date_format_opts);

    let list = `
    
        <nav>
            <a href="/" class="blog-link">← ${post.blog_title}</a>
        </nav>
        <article>
            <header class="post-header">
                <h1>${post.title}</h1>
                <time class="post-date">${post_date}</time>
            </header>
            <div class="post-content">
            ${post.content_html}
            </div>

        `;

    if (userLoggedIn && userId === post.user_id) {
        list += `
        <div style="margin-top:3em;">
            <span class="label label-green">${post.status}</span>
            <div style="display: flex; gap: 10px;margin-top:1em;">
                <form action="${post_slug}/delete" method="POST">
                    <input class="button-secondary" type="submit" value="Delete" onclick="return confirm('Are you sure?')">
                </form>
                <form action="${post_slug}/edit" method="GET">
                    <input type="submit" value="Edit">
                </form>
            </div>
        </div>`;
    }

    return c.html(renderHTML(`${post.title} | exotext`, raw(list), c.get('USER_LOGGED_IN')));
};

export const handlePostEditor = async (c: Context) => {
    const userId = c.get('USER_ID') || -1;
    const post_slug = c.req.param('post_slug');

    const post = await c.env.DB.prepare(`
        SELECT posts.post_id, posts.slug, posts.title, posts.content_md, posts.content_html, blogs.user_id, blogs.title as blog_title
        FROM posts
        JOIN blogs ON blogs.blog_id = posts.blog_id
        WHERE posts.slug = ?`)
        .bind(post_slug)
        .first();

    if (!c.get('USER_LOGGED_IN') || userId !== post.user_id) return c.text('Unauthorized', 401);

    const list = renderPostEditor(post.title, post.content_md, post.slug);

    return c.html(renderHTML(`${post.title} | ${post.feed_title}`, raw(list), true, { footer: false }));
};

export const handlePostEditPOST = async (c: Context) => {
    const userId = c.get('USER_ID') || -1;
    const postSlugExisting = c.req.param('post_slug');

    const postDBEntry = await c.env.DB.prepare(
        `
            SELECT posts.post_id, posts.blog_id, blogs.user_id
            FROM posts
            JOIN blogs ON blogs.blog_id = posts.blog_id
            WHERE posts.slug = ?
        `,
    )
        .bind(postSlugExisting)
        .run();

    const post = postDBEntry.results[0];

    if (!c.get('USER_LOGGED_IN') || userId !== post.user_id) return c.redirect('/');
    if (userId !== post.user_id) return c.text('Unauthorized', 401);

    const body = await c.req.parseBody();

    const postTitle = body['post-title'].toString();
    if (!postTitle) return c.text('Post title is required');
    const contentMD = body['post-content'].toString();
    if (!contentMD) return c.text('Post content is required');

    const postSlug = body['post-slug'].toString().toLowerCase();
    const newSlug = postSlug ? postSlug : postSlugExisting;
    // TODO: this is bad, but it's a quick fix for now

    // check if newSlug already exists
    const postSlugExists = await c.env.DB.prepare('SELECT slug FROM posts WHERE slug = ? AND post_id != ?')
        .bind(newSlug, post.post_id)
        .first();
    if (postSlugExists) return c.text('Post slug already exists');

    let contentHTML = await marked.parse(contentMD);
    contentHTML = await sanitizeHTML(contentHTML);

    const status = body.action.toString().toLowerCase() === 'publish' ? 'public' : 'draft';

    const results = await c.env.DB.prepare(
        'UPDATE posts SET title = ?, content_md = ?, content_html = ?, status = ?, slug = ? WHERE post_id = ?',
    )
        .bind(postTitle, contentMD, contentHTML, status, newSlug, post.post_id)
        .run();

    return c.redirect(`/${newSlug}`);
};

export const handleBlogRSS = async (c: Context) => {
    return c.html('RSS SOON');
};

export const handlePostDeletePOST = async (c: Context) => {
    const userId = c.get('USER_ID') || -1;
    const slug = c.req.param('post_slug');

    const postDBEntry = await c.env.DB.prepare(`
        SELECT posts.post_id, posts.blog_id, blogs.user_id
        FROM posts
        JOIN blogs ON blogs.blog_id = posts.blog_id
        WHERE posts.slug = ?
    `)
        .bind(slug)
        .run();

    const post = postDBEntry.results[0];

    if (!c.get('USER_LOGGED_IN') || userId !== post.user_id) return c.text('Unauthorized', 401);

    await c.env.DB.prepare('DELETE FROM posts WHERE post_id = ?').bind(post.post_id).run();

    return c.redirect('/');
};

// UTILS
const generate_slug = (title: string) => {
    if (title === 'rss') return 'rss-2';
    return title
        .substring(0, 32)
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '-')
        .toLowerCase();
};

export const handleNewPost = async (c: Context) => {
    return c.html('aaa');
};
