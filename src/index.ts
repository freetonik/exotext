import type { Context, Env } from 'hono';
import { Hono } from 'hono';
import { raw } from 'hono/html';
import {
    handleLogin,
    handleLoginPOST,
    handleLogout,
    handleMyAccount,
    handleNewBlogPost,
    handleResentVerificationEmailPOST,
    handleResetPassword,
    handleResetPasswordPOST,
    handleSetPasswordPOST,
    handleSignup,
    handleSignupPOST,
    handleVerifyEmail,
} from './account';
import {
    handleBlog,
    handleBlogPOST,
    handleBlogRSS,
    handleNewPost, // new blog post handler
    handlePostDeletePOST,
    handlePostEditPOST,
    handlePostEditor,
    handlePostSingle
} from './blogs';
import { handleHomepage, handleWaitingListPOST } from './homepage';
// import { handleAdmin } from './admin';
import { renderHTML } from './htmltools';
import {
    adminRequiredMiddleware,
    authCheckMiddleware,
    authRequiredMiddleware,
    subdomainMiddleware,
} from './middleware';
import { handleUploadImage } from './upload';

// ————————————————————————————————————————————————————————————————>>>>

// main app handles the root paths
const app = new Hono<{ Bindings: CloudflareBindings }>({
    strict: false,
});

app.get('/robots.txt', async (c) => c.text('User-agent: *\nAllow: /'));

app.use('*', authCheckMiddleware);
app.use('/my/*', authRequiredMiddleware);
app.use('/admin/*', adminRequiredMiddleware);

const handleNotFound = (c: Context) => {
    return c.html(
        renderHTML('404 | exotext', raw(`<div class="flash">Page not found.</div>`), c.get('USER_LOGGED_IN')),
    );
};

const handleError = (err: Error, c: Context) => {
    return c.html(
        renderHTML('Error | exotext', raw(`<div class="flash flash-red">${err}.</div>`), c.get('USER_LOGGED_IN'), {
            footer: false,
        }),
    );
};

app.notFound(handleNotFound);
app.onError(handleError);

// APP ROUTES
app.get('/', handleHomepage);
app.post('/waiting_list', handleWaitingListPOST);

// ADMIN ROUTES
// app.get('/admin', handleAdmin);

// // NORMAL ROUTES
// app.get('/feedback', handleFeedback);

app.get('/login', handleLogin);
app.post('/login', handleLoginPOST);
app.get('/reset_password', handleResetPassword);
app.post('/reset_password', handleResetPasswordPOST);
app.post('/set_password', handleSetPasswordPOST);
app.get('/signup', handleSignup);
app.post('/signup', handleSignupPOST);
app.get('/logout', authRequiredMiddleware, handleLogout);

app.get('/my/account', handleMyAccount);
app.post('/my/account/create_blog', adminRequiredMiddleware, handleNewBlogPost);
app.post('/my/account/resend_verification_link', handleResentVerificationEmailPOST);
app.get('/verify_email', handleVerifyEmail);

// app.get('/about', async (c: Context) => c.html(renderHTML('About | exotext', raw(about), c.get('USER_LOGGED_IN'))));

const subdomainApp = new Hono<{ Bindings: CloudflareBindings }>({
    strict: false,
});
subdomainApp.use('*', authCheckMiddleware);
subdomainApp.use('*', subdomainMiddleware);

subdomainApp.get('/robots.txt', async (c) => c.text('User-agent: *\nAllow: /'));

subdomainApp.get('/', handleBlog);
subdomainApp.get('/~new', handleNewPost);
subdomainApp.post('/', handleBlogPOST);
subdomainApp.post('/upload', handleUploadImage);

subdomainApp.get('/rss', handleBlogRSS);
subdomainApp.get('/:post_slug', handlePostSingle);
subdomainApp.get('/:post_slug/edit', handlePostEditor);
subdomainApp.post('/:post_slug/edit', handlePostEditPOST);
subdomainApp.post('/:post_slug/delete', handlePostDeletePOST);

subdomainApp.notFound(handleNotFound);
subdomainApp.onError(handleError);

// Main app to route based on Host
const appMain = new Hono<{ Bindings: CloudflareBindings }>({
    strict: false,
});

appMain.all('*', async (c: Context, next) => {
    const host = c.req.raw.headers.get('host'); // Cloudflare Workers use lowercase 'host'
    if (host) {
        if (host.split('.').length === 3) {
            // if subdomain is in the form of sub.example.com
            return await subdomainApp.fetch(c.req.raw, c.env);
        }
        // Default to root app for the main domain (example.com)
        return await app.fetch(c.req.raw, c.env);
    }
    return await app.fetch(c.req.raw, c.env);
});

// MAIN EXPORT
export default {
    fetch: (req: Request, env: Env, ctx: ExecutionContext) => appMain.fetch(req, env, ctx), // normal processing of requests

    // async scheduled(event: ScheduledEvent, env: Bindings, ctx: ExecutionContext) {
    //     // scheduled tasks
    // },
};
