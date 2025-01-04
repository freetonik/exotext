import hljs from 'highlight.js';
import type { Context } from 'hono';
import { raw } from 'hono/html';
import { Marked } from 'marked';
import markedFootnote from 'marked-footnote';
import { markedHighlight } from 'marked-highlight';
import markedKatex from 'marked-katex-extension';
import RSS from 'rss';
import { renderPostEditor } from './editor';
import { renderHTMLBlog } from './htmltools';
import { sanitizeHTML, truncate } from './utils';

export const handleBlog = async (c: Context) => {
    const subdomain = c.get('SUBDOMAIN');
    const userLoggedIn = !!c.get('USER_LOGGED_IN');

    if (!userLoggedIn) {
        const cacheKey = new Request(`https://blog-cache/${subdomain}`);
        const cache = caches.default;

        try {
            const cachedResponse = await cache.match(cacheKey);
            if (cachedResponse) {
                return new Response(cachedResponse.body, {
                    headers: {
                        'Content-Type': 'text/html;charset=UTF-8',
                        'Cache-Hit': 'true',
                    },
                });
            }
        } catch (error) {
            // Log cache error but continue with normal page generation
            console.error('Cache retrieval error:', error);
        }
    }

    const userId = c.get('USER_ID') || -1;

    const batch = await c.env.DB.batch([
        c.env.DB.prepare(`
        SELECT title, user_id, slug, description
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
    const userIsOwner = userLoggedIn && userId === blog.user_id;

    let list = `
        <header class="blog-header">
            <h1>${blog.title}</h1>
            <p class="blog-description">${blog.description}
            ${userIsOwner ? `<a class="muted no-color" href="/~/edit_description">[edit]</a>` : ''}
            </p>
        </header>
    `;

    let quickDraft = '';

    if (userIsOwner) {
        quickDraft = `
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

    list += `<section class="posts">${quickDraft}`;
    for (const post of posts) {
        if (post.status !== 'public' && (!userLoggedIn || userId !== blog.user_id)) continue;
        const postDate = formatDate(new Date(post.pub_date));
        let status_block = '';
        if (userIsOwner && post.status === 'draft') {
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

    const html = renderHTMLBlog(`${blog.title}`, raw(list), userLoggedIn);
    const response = c.html(html);

    if (!userLoggedIn) {
        try {
            const cacheKey = new Request(`https://blog-cache/${subdomain}`);
            const cache = caches.default;
            const cacheResponse = new Response(html, {
                headers: {
                    'Content-Type': 'text/html;charset=UTF-8',
                    'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
                },
            });
            await cache.put(cacheKey, cacheResponse);
        } catch (error) {
            // Log cache error but continue with normal response
            console.error('Cache storage error:', error);
        }
    }

    return response;
};

// create new draft blog post and either go to editing or homepage
export const handleBlogPOST = async (c: Context) => {
    const subdomain = c.get('SUBDOMAIN');
    if (!subdomain) return c.notFound();

    const userId = c.get('USER_ID') || -1;
    if (!c.get('USER_LOGGED_IN')) return c.notFound();

    // get blog_id, user_id, feed_id for the given subdomain
    const blog = await c.env.DB.prepare('SELECT blogs.blog_id, blogs.user_id FROM blogs WHERE blogs.slug = ?')
        .bind(subdomain)
        .first();
    if (!blog) return c.notFound();

    if (userId !== blog.user_id) return c.text('Unauthorized', 401);

    // ok, user is logged in and is the owner of the blog
    const body = await c.req.parseBody();

    let title = body['post-title'].toString();
    const postContentFromBody = body['post-content'].toString().trim();
    const postContent = postContentFromBody ? postContentFromBody : 'empty draft';

    if (!title.length) title = truncate(postContent, 128);
    const postContentHTML = await markdownToHTML(postContent);

    try {
        let item_slug = generate_slug(title);

        const slug_check = await c.env.DB.prepare('SELECT * FROM posts WHERE blog_id = ? AND slug = ?')
            .bind(blog.blog_id, item_slug)
            .run();

        if (slug_check.results.length) {
            item_slug += `-${Date.now()}`;
        }

        const pubDate = new Date().toISOString();
        const requestedAction = body.action.toString().toLowerCase();

        await c.env.DB.prepare(
            'INSERT INTO posts (blog_id, title, slug, content_md, content_html, pub_date) values (?, ?, ?, ?, ?, ?)',
        )
            .bind(blog.blog_id, title, item_slug, postContent, postContentHTML, pubDate)
            .run();
        if (requestedAction === 'quick save') return c.redirect('/');
        if (requestedAction === 'continue editing in full') return c.redirect(`/${item_slug}/edit`);
        // }

        return c.redirect('/');
    } catch (err) {
        return c.text(err);
    }
};

export const handlePostSingle = async (c: Context) => {
    const subdomain = c.get('SUBDOMAIN');
    const userLoggedIn = !!c.get('USER_LOGGED_IN');
    const postSlug = c.req.param('post_slug');

    if (!userLoggedIn) {
        const cacheKey = new Request(`https://blog-cache/${subdomain}/${postSlug}`);
        const cache = caches.default;

        try {
            const cachedResponse = await cache.match(cacheKey);
            if (cachedResponse) {
                return new Response(cachedResponse.body, {
                    headers: {
                        'Content-Type': 'text/html;charset=UTF-8',
                        'Cache-Hit': 'true',
                    },
                });
            }
        } catch (error) {
            // Log cache error but continue with normal page generation
            console.error('Cache retrieval error:', error);
        }
    }

    const userId = c.get('USER_ID') || -1;

    const postDBEntry = await c.env.DB.prepare(
        `
            SELECT posts.title, posts.content_html, blogs.user_id, posts.pub_date, posts.status, blogs.title as blog_title
            FROM posts
            JOIN blogs ON blogs.blog_id = posts.blog_id
            WHERE blogs.slug = ? AND posts.slug = ?
        `,
    )
        .bind(subdomain, postSlug)
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
            </div
        </article>

        `;

    if (userLoggedIn && userId === post.user_id) {
        list += `
        <div style="margin-top:3em;">
            <span class="label label-green">${post.status}</span>
            <div style="display: flex; gap: 10px;margin-top:1em;">
                <form action="${postSlug}/delete" method="POST">
                    <input class="button-secondary" type="submit" value="Delete" onclick="return confirm('Are you sure?')">
                </form>
                <form action="${postSlug}/edit" method="GET">
                    <input type="submit" value="Edit">
                </form>
            </div>
        </div>`;
    }
    const html = renderHTMLBlog(`${post.title} | exotext`, raw(list), c.get('USER_LOGGED_IN'));
    const response = c.html(html);

    if (!userLoggedIn) {
        try {
            const cacheKey = new Request(`https://blog-cache/${subdomain}/${postSlug}`);
            const cache = caches.default;
            const cacheResponse = new Response(html, {
                headers: {
                    'Content-Type': 'text/html;charset=UTF-8',
                    'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
                },
            });
            await cache.put(cacheKey, cacheResponse);
        } catch (error) {
            // Log cache error but continue with normal response
            console.error('Cache storage error:', error);
        }
    }

    return response;
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

    return c.html(renderPostEditor(post.post_id, post.title, post.content_md, post.slug, post.blog_title));
};

// edit existing blog post
export const handlePostEditPOST = async (c: Context) => {
    const subdomain = c.get('SUBDOMAIN');
    const userId = c.get('USER_ID') || -1;
    const postId = c.req.param('post_id');

    const post = await c.env.DB.prepare(`
        SELECT posts.post_id, posts.slug, posts.blog_id, blogs.user_id
        FROM posts
        JOIN blogs ON blogs.blog_id = posts.blog_id
        WHERE posts.post_id = ?
        `)
        .bind(postId)
        .first();

    if (!c.get('USER_LOGGED_IN') || userId !== post.user_id) return c.text('Unauthorized', 401);

    const body = await c.req.parseBody();

    const postTitle = body['post-title'].toString();
    if (!postTitle) return c.text('Post title is required');
    const contentMD = body['post-content'].toString();
    if (!contentMD) return c.text('Post content is required');

    let newSlug = body['post-slug'].toString().toLowerCase();

    // slug has been changed
    if (post.slug !== newSlug) {
        // check if slug already exists
        const postSlugExisting = await c.env.DB.prepare(
            'SELECT slug FROM posts WHERE blog_id = ? AND slug = ? AND post_id != ?',
        )
            .bind(post.blog_id, newSlug, post.post_id)
            .first();

        if (postSlugExisting) newSlug += `-${Date.now()}`;
    }

    const contentHTML = await markdownToHTML(contentMD);
    const requestedAction = body.action.toString().toLowerCase();
    const status = requestedAction === 'publish' ? 'public' : 'draft';

    const results = await c.env.DB.prepare(
        'UPDATE posts SET title = ?, content_md = ?, content_html = ?, status = ?, slug = ? WHERE post_id = ?',
    )
        .bind(postTitle, contentMD, contentHTML, status, newSlug, post.post_id)
        .run();

    // TODO: actually check if there are errors and show a message without losing state

    await invalidateBlogCache(subdomain);
    await invalidatePostCache(subdomain, newSlug);

    return c.redirect(`/${newSlug}`);
};

export const handleBlogDescriptionEditor = async (c: Context) => {
    if (!c.get('USER_LOGGED_IN')) return c.text('Unauthorized', 401);
    const userId = c.get('USER_ID');
    const subdomain = c.get('SUBDOMAIN');

    const blog = await c.env.DB.prepare(`
        SELECT title, user_id, description 
        FROM blogs
        WHERE blogs.slug = ?`)
        .bind(subdomain)
        .first();

    if (!blog) return c.notFound();
    if (userId !== blog.user_id) return c.text('Unauthorized', 401);

    const html = `
        <h1>Edit blog description</h1>
        <div class="quick-draft">
        <form method="POST">
            <div style="margin-bottom:1em;">
                <textarea name="description" rows="9" style="width:100%;">${blog.description || ''}</textarea>
            </div>
            <div class="buttons">
                <a href="/" class="button button-outline">Cancel</a>
                <input type="submit" value="Save">
            </div>
        </form>
        </div>
    `;

    return c.html(renderHTMLBlog(blog.title, raw(html), c.get('USER_LOGGED_IN')));
};

export const handleBlogDescriptionPOST = async (c: Context) => {
    if (!c.get('USER_LOGGED_IN')) return c.text('Unauthorized', 401);
    const userId = c.get('USER_ID');
    const subdomain = c.get('SUBDOMAIN');

    const blog = await c.env.DB.prepare(`
        SELECT blog_id, user_id
        FROM blogs 
        WHERE blogs.slug = ?`)
        .bind(subdomain)
        .first();

    if (!blog) return c.notFound();
    if (userId !== blog.user_id) return c.text('Unauthorized', 401);

    const body = await c.req.parseBody();
    const description = body.description?.toString() || '';

    await c.env.DB.prepare(`
        UPDATE blogs 
        SET description = ? 
        WHERE blog_id = ?`)
        .bind(description, blog.blog_id)
        .run();

    await invalidateBlogCache(subdomain);

    return c.redirect('/');
};


export const handleBlogRSS = async (c: Context) => {
    const subdomain = c.get('SUBDOMAIN');

    const batch = await c.env.DB.batch([
        c.env.DB.prepare(`
        SELECT title, user_id, slug
        FROM blogs
        WHERE blogs.slug = ?`).bind(subdomain),

        c.env.DB.prepare(`
        SELECT posts.post_id, posts.title, posts.slug, posts.pub_date, posts.content_html
        FROM posts
        JOIN blogs ON blogs.blog_id = posts.blog_id
        WHERE status = 'public' and blogs.slug = ?
        ORDER BY posts.pub_date DESC`).bind(subdomain),
    ]);

    if (!batch[0].results.length) return c.notFound();
    const blog = batch[0].results[0];
    const posts = batch[1].results;

    const feed = new RSS({
        title: blog.title,
        description: blog.description,
        feed_url: `https://${subdomain}.exotext.com/rss.xml`,
        site_url: `https://${subdomain}.exotext.com`,
        language: 'en',
        // pubDate: 'May 20, 2012 04:00:00 GMT', // TODO!
    });

    for (const post of posts) {
        feed.item({
            title: post.title,
            description: post.content_html,
            url: `https://${subdomain}.exotext.com/${post.slug}`,
            date: post.pub_date,
        });
    }

    return c.text(feed.xml({ indent: true }), 200, {
        'Content-Type': 'application/xml',
    });
};

export const handlePostDeletePOST = async (c: Context) => {
    if (!c.get('USER_LOGGED_IN')) return c.text('Unauthorized', 401);
    const userId = c.get('USER_ID') || -1;
    const subdomain = c.get('SUBDOMAIN');
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

    if (userId !== post.user_id) return c.text('Unauthorized', 401);

    await c.env.DB.prepare('DELETE FROM posts WHERE post_id = ?').bind(post.post_id).run();

    await invalidateBlogCache(subdomain);
    await invalidatePostCache(subdomain, slug);
    return c.redirect('/');
};

// UTILS
const generate_slug = (title: string) => {
    if (title === 'rss.xml') return 'rss.xml-2';
    return title
        .substring(0, 128)
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase();
};

export const markdownToHTML = async (mdContent: string) => {
    const marked = new Marked(
        markedHighlight({
            emptyLangClass: 'hljs',
            langPrefix: 'hljs language-',
            highlight(code, lang, info) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, { language }).value;
            },
        }),
    );
    const options = {
        throwOnError: false,
    };

    marked.use(markedKatex(options));
    marked.use(markedFootnote());

    const preprocessedMd = preProcessMarkdown(mdContent);
    const postContentHTML = await marked.parse(preprocessedMd);
    return await sanitizeHTML(postContentHTML);
};

export const invalidateBlogCache = async (subdomain: string) => {
    const cacheKey = new Request(`https://blog-cache/${subdomain}`);
    const cache = caches.default;
    try {
        await cache.delete(cacheKey);
    } catch (error) {
        console.error('Cache invalidation error:', error);
    }
};

export const invalidatePostCache = async (subdomain: string, postSlug: string) => {
    const cacheKey = new Request(`https://blog-cache/${subdomain}/${postSlug}`);
    const cache = caches.default;
    try {
        await cache.delete(cacheKey);
    } catch (error) {
        console.error('Cache invalidation error:', error);
    }
};

function preProcessMarkdown(text: string) {
    return convertYouTubeLinksToEmbeds(text);
}

function convertYouTubeLinksToEmbeds(text: string): string {
    // Split the input into lines, preserving empty lines
    const lines = text.split('\n');

    // Process each line
    const processedLines = lines.map((line, index) => {
        const trimmedLine = line.trim();

        // Skip if line isn't empty but contains more than just a URL
        if (!trimmedLine || trimmedLine.includes(' ')) {
            return line;
        }

        // Check if line is isolated by newlines or is first/last line
        const isFirstLine = index === 0;
        const isLastLine = index === lines.length - 1;
        const hasPrecedingNewline = isFirstLine || lines[index - 1].trim() === '';
        const hasFollowingNewline = isLastLine || lines[index + 1].trim() === '';

        if (!hasPrecedingNewline || !hasFollowingNewline) {
            return line;
        }

        try {
            const url = new URL(trimmedLine);

            let videoId = null;
            if (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') {
                videoId = url.searchParams.get('v');
            } else if (url.hostname === 'youtu.be') {
                videoId = url.pathname.slice(1);
            }

            if (videoId) {
                return `<p><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;   gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></p>`;
            }
        } catch (e) {
            return line;
        }

        return line;
    });

    return processedLines.join('\n');
}
