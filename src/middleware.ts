import type { Context } from 'hono';
import { getCookie } from 'hono/cookie';

// Set user_id and username in context if user is logged in
export async function authCheckMiddleware(c: Context, next) {
    const sessionKey = getCookie(c, 'exotext_session');
    if (sessionKey) {
        const kv_value = await c.env.SESSIONS_KV.get(sessionKey);
        if (kv_value != null) {
            const values = kv_value.split(';');
            c.set('USER_ID', Number.parseInt(values[0]));
            c.set('EMAIL', values[1]);
            c.set('USER_LOGGED_IN', true);
            c.set('USER_IS_ADMIN', values[0] === '1');
            // TODO: upsert KV only when key is expiring soon
            await c.env.SESSIONS_KV.put(sessionKey, kv_value, {
                expirationTtl: 31536000, // 1 year
            });
        } else {
            c.set('USER_LOGGED_IN', false);
        }
    } else {
        c.set('USER_LOGGED_IN', false);
    }
    await next();
}

// User must be logged in
export async function authRequiredMiddleware(c: Context, next: () => any) {
    if (!c.get('USER_ID')) return c.redirect('/login');
    await next();
}

// User must be logged in and be admin
export async function adminRequiredMiddleware(c: Context, next: () => any) {
    if (!c.get('USER_IS_ADMIN')) {
        c.status(401);
        return c.body('Unauthorized');
    }
    await next();
}

export async function subdomainMiddleware(c: Context, next: () => any) {
    const host = c.req.raw.headers.get('host');
    if (host) {
        const subdomain = host.split('.')[0];
        c.set('SUBDOMAIN', subdomain);
    } else {
        throw new Error('Host header is missing');
    }
    await next();
}
