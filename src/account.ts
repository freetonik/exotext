import type { Context } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { raw } from 'hono/html';
import type { Bindings } from './bindings';
import { sendEmail } from './email';
import { renderHTML } from './htmltools';

export const handleMyAccount = async (c: Context) => {
    const user_id = c.get('USER_ID');
    const batch = await c.env.DB.batch([
        c.env.DB.prepare(`
            SELECT created, username, email_verified, email
            FROM users
            WHERE user_id = ?`).bind(user_id),

        c.env.DB.prepare(`
            SELECT blogs.blog_id, blogs.title, blogs.slug
            FROM blogs
            WHERE user_id = ?`).bind(user_id),
    ]);

    const user = batch[0];
    const user_blogs = batch[1];

    const resend_verification_link_form = !user.results[0].email_verified
        ? `<form action="/my/account/resend_verification_link" method="post">
             <input type="submit" value="Resend verification link">
           </form>`
        : '';

    const verifiedOrNot = user.results[0].email_verified
        ? '<span class="label label-green" style="margin-left:0.5rem;">verified</span>'
        : `<span class="label label-red" style="margin-left:0.5rem;">verified</span> ${resend_verification_link_form}`;

    const email = user.results[0].email ? user.results[0].email : 'no';
    const username = user.results[0].username;
    const status = user.results[0].status;

    let listOfBlogs = '<section class="settings-section"><h2>MY BLOGS</h2><div class="blogs-list">';
    if (user_blogs.results.length > 0) {
        for (const blog of user_blogs.results) {
            listOfBlogs += `
            <div class="blog-item">
                <div class="blog-title">${blog.title}</div>
                <a href="https://${blog.slug}.exotext.com" class="blog-url">https://${blog.slug}.exotext.com</a>
            </div>
            `;
        }
    }
    listOfBlogs += '</div></section>';

    const list = `
    <style>.container{max-width: 680px;}</style>
    <nav>
        <a href="/" class="logo">EXOTEXT</a>
    </nav>

    <main>
        <section class="settings-section">
            <h1>My account</h1>
            <div class="account-info">
                <div class="info-row">
                    <span class="label-form">USERNAME</span>
                    <span class="value">${username}</span>
                </div>
                <div class="info-row">
                    <span class="label-form">EMAIL</span>
                    <span class="value">
                        ${email}
                        ${verifiedOrNot}
                    </span>
                </div>
                <div class="info-row">
                    <span class="label-form">MEMBER SINCE</span>
                    <span class="value">October 2024</span>
                </div>
            </div>

    ${listOfBlogs}
    
    <div class="button-group">
         <a class="button" href="/logout">Log out</a>
    </div>`;

    return c.html(renderHTML('My account | exotext', raw(list), username));
};

export const handleVerifyEmail = async (c: Context) => {
    const code = c.req.query('code');
    const username = c.get('USER_LOGGED_IN');
    const result = await c.env.DB.prepare('SELECT * from email_verifications WHERE verification_code = ?')
        .bind(code)
        .run();

    if (!result.results.length) {
        return c.html(
            renderHTML(
                'Email verification | exotext',
                raw(`<div class="flash flash-red">Email verification code is invalid or has been used already.</div>`),
                c.get('USER_LOGGED_IN'),
            ),
        );
    }

    const userId = result.results[0].user_id;
    await c.env.DB.batch([
        c.env.DB.prepare('UPDATE users SET email_verified = 1 WHERE user_id = ?').bind(userId),
        c.env.DB.prepare('DELETE FROM email_verifications WHERE user_id = ?').bind(userId),
    ]);

    const message_flash = c.get('USER_LOGGED_IN')
        ? `<div class="flash flash-success">You can now go to <a href="/my">your feed</a>... Or contemplate life.</div>`
        : `<div class="flash flash-success">You can now <a href="/login">log in</a>.</div>`;

    return c.html(
        renderHTML('Email verification | exotext', raw(message_flash), c.get('USER_LOGGED_IN'), { footer: false }),
    );
};

export const handleResentVerificationEmailPOST = async (c: Context) => {
    const result = await c.env.DB.prepare(
        `SELECT verification_code, email, username
        FROM email_verifications
        JOIN users ON email_verifications.user_id = users.user_id
        WHERE email_verifications.user_id = ?`,
    )
        .bind(c.get('USER_ID'))
        .first();

    await sendEmailVerificationLink(c.env, result.username, result.email, result.verification_code);

    return c.html(
        renderHTML(
            'Email verification | exotext',
            raw(`<div class="flash flash-blue">Verification link is sent</div>`),
            true,
        ),
    );
};

export const handleLogout = async (c: Context) => {
    const sessionKey = getCookie(c, 'exotext_session');
    if (!sessionKey) {
        return c.redirect('/');
    }
    await c.env.SESSIONS_KV.delete(sessionKey);
    deleteCookie(c, 'exotext_session');
    return c.redirect('/');
};

const renderLoginForm = (email?: string, error?: string) => {
    const emailValue = email ? email : '';
    const errorMessage = error ? `<div class="flash flash-success">${error}</div>` : '';
    return `
    <div class="container-sm service-page">
    <nav>
        <a href="/" class="logo">EXOTEXT</a>
    </nav>

    <main>
        <h1>Sign In</h1>

        <form action="/login" method="POST">
            <div class="form-group">
                <label for="email">EMAIL</label>
                <input type="email" id="email" name="email" value="${emailValue}" required>
            </div>

            <div class="form-group">
                <label for="password">PASSWORD</label>
                <input type="password" id="password" name="password" required>
            </div>

            <input type="submit" value="Sign in">
            ${errorMessage}

            <div class="links">
                <a href="/reset_password">Forgot your password?</a>
                <a href="/signup">Create an account</a>
            </div>
        </form>
    </main>
    </div>

    `;
};

export const handleLogin = async (c: Context) => {
    if (c.get('USER_ID')) return c.redirect('/my');

    return c.html(renderHTML('Login or create account | exotext', raw(renderLoginForm()), false, { footer: false }));
};

export const handleResetPassword = async (c: Context) => {
    if (c.get('USER_LOGGED_IN')) return c.redirect('/my');
    const code = c.req.query('code');
    let inner = '';

    if (code) {
        const result = await c.env.DB.prepare('SELECT * from password_resets WHERE reset_code = ?').bind(code).first();
        if (!result) throw new Error('Reset code is invalid or has been used already');

        inner = `
            <div style="max-width:25em;margin:auto;">
                <div>
                    <h2 style="margin-top:0;">Set new password</h2>
                    <form action="/set_password" method="POST">
                        <div style="margin-bottom:2em;">
                            <label for="pass">Password (8 characters minimum)</label>
                            <input type="password" id="password" name="password" minlength="8" required />
                            <input type="text" id="reset_code" name="reset_code" required value="${code}" readonly="readonly" hidden  />
                        </div>
                        <input type="submit" value="Set password">
                    </form>
                </div>
            </div>`;
    } else {
        // no code provided, show form to enter email
        inner = `
        <div class="container-sm service-page">

        <nav>
            <a href="/" class="logo">EXOTEXT</a>
        </nav>

        <main>
            <div class="form-state">
                <h1>Reset Password</h1>
                <p>Enter your email address and we'll send you instructions to reset your password.</p>

                <form action="/reset_password" method="POST">
                    <div class="form-group">
                        <label for="email">EMAIL</label>
                        <input type="email" id="email" name="email" required>
                    </div>

                    <input type="submit" value="Reset password">
                </form>
            </div>

            <div class="links">
                <a href="/login">Return to sign in</a>
            </div>
        </main>

        </div>
        `;
    }

    return c.html(renderHTML('Reset password | exotext', raw(inner), false, { footer: false }));
};

export const handleResetPasswordPOST = async (c: Context) => {
    const body = await c.req.parseBody();
    console.log(body);
    const email = body.email.toString().toLowerCase();

    if (!email) throw new Error('Email is required');
    if (!checkEmail(email)) throw new Error('Invalid email');

    const existing_user = await c.env.DB.prepare('SELECT user_id, username, email FROM users WHERE email = ?')
        .bind(email)
        .first();

    if (existing_user) {
        const password_reset_code = randomHash(32);
        await c.env.DB.prepare('INSERT INTO password_resets (user_id, reset_code) VALUES (?, ?)')
            .bind(existing_user.user_id, password_reset_code)
            .run();

        await send_password_reset_link(c.env, email, password_reset_code);
    }

    return c.html(
        renderHTML(
            'Password reset | exotext',
            raw(`<div class="flash">
                If the email address you entered is associated with an account, you will receive an email with a link to reset your password.
            </div>`),
            false,
            { footer: false },
        ),
    );
};

export const handleSetPasswordPOST = async (c: Context) => {
    const body = await c.req.parseBody();
    const password = body.password.toString();
    const reset_code = body.reset_code.toString();

    if (password.length < 8) throw new Error('Password too short');

    const code_from_db = await c.env.DB.prepare('SELECT * from password_resets WHERE reset_code = ?')
        .bind(reset_code)
        .first();

    if (!code_from_db) throw new Error('Reset code is invalid or has been used already.');

    const user_id = code_from_db.user_id;
    const [new_password_hash, new_salt] = await hashPassword(password);
    const updating_query = await c.env.DB.prepare(
        'UPDATE users SET password_hash = ?, password_salt = ? WHERE user_id = ?',
    )
        .bind(new_password_hash, new_salt, user_id)
        .run();

    if (!updating_query.success) throw new Error('Something went wrong when updating your password.');

    // Delete all password reset codes of user, verify their email
    await c.env.DB.batch([
        c.env.DB.prepare('DELETE FROM password_resets WHERE user_id = ?').bind(user_id),
        c.env.DB.prepare('UPDATE users SET email_verified = 1 WHERE user_id = ?').bind(user_id),
        c.env.DB.prepare('DELETE FROM email_verifications WHERE user_id = ?').bind(user_id),
    ]);

    const inner = raw(
        `<div class="flash flash-success">Password reset successfully. <a href="/login">Log in now</a>.</div>`,
    );

    return c.html(renderHTML('Reset password | exotext', inner, false, { footer: false }));
};

export const handleSignup = async (c: Context) => {
    if (c.get('USER_LOGGED_IN')) return c.redirect('/my');

    const inner = `
    <style>
    .help-text {
        display: block;
        font-family: monospace;
        font-size: 0.8rem;
        margin-top: 0.5rem;
        color: var(--help-color);
    }
    /* Password Requirements */
    .requirements {
        font-family: monospace;
        font-size: 0.8rem;
        color: var(--help-color);
        margin-top: 0.5rem;
    }

    .requirements ul {
        list-style: none;
        margin-top: 0.5rem;
    }
    .blog-url-preview {
        font-family: monospace;
        font-size: 0.9rem;
        color: var(--secondary-text);
        margin-top: 0.5rem;
    }
    </style>
    <div class="container-sm service-page">
    <nav>
        <a href="/" class="logo">EXOTEXT</a>
    </nav>

    <main>
        <h1>Sign up</h1>

        <form action="/signup" method="POST">
            <div class="form-group">
                <label for="invitation_code">INVITATION CODE</label>
                <input type="text" id="invitation_code" name="invitation_code" required>
            </div>

            <div class="form-group">
                <label for="username">USERNAME</label>
                <input type="text" id="username" name="username" required>
                <span class="help-text">Your display name. Can be changed later.</span>
            </div>

            <div class="form-group">
                <label for="email">EMAIL</label>
                <input type="email" id="email" name="email" required>
            </div>

            <div class="form-group">
                <label for="slug">BLOG URL</label>
                <input type="text" id="slug" name="slug" required 
                        pattern="[a-zA-Z0-9-]+" title="Only letters, numbers, and hyphens are allowed">
                <div class="blog-url-preview">.exotext.com</div>
            </div>

            <div class="form-group">
                <label for="password">PASSWORD</label>
                <input type="password" id="password" name="password" required>
                <div class="requirements">
                    <ul>
                        <li>• At least 8 characters</li>
                        <li>• Should not contain dad jokes</li>
                    </ul>
                </div>
            </div>

            <input type="submit" value="Create account">

            <div class="links">
                <span>Already have an account? <a href="/login">Sign in</a></span>
            </div>
        </form>
    </main>

    </div>
    `;
    return c.html(renderHTML('Create account | exotext', raw(inner), false, { footer: false }));
};

export const handleLoginPOST = async (c: Context) => {
    const body = await c.req.parseBody();
    const email = body.email.toString();
    const attempted_password = body.password.toString();

    if (!email || !attempted_password) {
        return c.html(
            renderHTML(
                'Login or create account | exotext',
                raw(renderLoginForm(email, 'Username and password are required')),
                false,
                { footer: false },
            ),
        );
    }

    const user = await c.env.DB.prepare('SELECT * FROM users WHERE users.email = ?').bind(email).first();
    if (!user) {
        // though user may not exist, we should not leak this information
        return c.html(
            renderHTML(
                'Login or create account | exotext',
                raw(renderLoginForm(email, 'Wrong email or password')),
                false,
                { footer: false },
            ),
        );
    }

    const verified = await verifyPassword(user.password_hash, user.password_salt, attempted_password);
    if (verified) {
        try {
            return await createSessionSetCookieAndRedirect(c, user.user_id, user.email);
        } catch (err) {
            throw new Error('Something went horribly wrong.');
        }
    }
    throw new Error('Something went horribly wrong.');
};

export const handleSignupPOST = async (c: Context) => {
    const body = await c.req.parseBody();
    const username = body.username.toString();
    const password = body.password.toString();
    const email = body.email.toString().toLowerCase();
    const invitation_code = body.invitation_code.toString();

    const invitationCodes = c.env.INVITATION_CODES.split(',');

    // if invitation code is not one of valid ones, throw error
    if (!invitationCodes.includes(invitation_code)) throw new Error('Invalid invitation code');

    if (!checkUsername(username)) throw new Error('Invalid username');
    if (password.length < 8) throw new Error('Password too short');
    if (!checkEmail(email)) throw new Error('Invalid email');

    // Check if username already exists
    const existingUser = await c.env.DB.prepare('SELECT username FROM users WHERE username = ?')
        .bind(username.toLowerCase())
        .first();
    if (existingUser) {
        throw new Error('Username already taken. Please choose a different username.');
    }
    // Check if email already exists
    const existing_email = await c.env.DB.prepare('SELECT email FROM users WHERE email = ?').bind(email).first();
    if (existing_email && existing_email.email === email) {
        throw new Error('Email already taken. Please use a different email.');
    }
    // Check if blog slug already exists
    const slug = body.slug.toString().toLowerCase();
    const existing_slug = await c.env.DB.prepare('SELECT slug FROM blogs WHERE slug = ?').bind(slug).first();
    if (existing_slug && existing_slug.slug === slug) {
        throw new Error('Blog address already taken. Please choose a different address.');
    }

    const [password_hash, salt] = await hashPassword(password);
    try {
        await c.env.DB.prepare('INSERT INTO users (username, email, password_hash, password_salt) values (?, ?, ?, ?)')
            .bind(username, email, password_hash, salt)
            .run();

        const userId = (
            await c.env.DB.prepare('SELECT users.user_id FROM users WHERE username = ?').bind(username).first()
        ).user_id;

        const email_verification_code = randomHash(32);
        await c.env.DB.prepare('INSERT INTO email_verifications (user_id, verification_code) values (?, ?)')
            .bind(userId, email_verification_code)
            .run();

        await sendEmailVerificationLink(c.env, username, email, email_verification_code);
        return await createSessionSetCookieAndRedirect(c, userId, username, '/', true); // first login ever
    } catch (err) {
        throw new Error('Something went horribly wrong.');
    }
};

const sendEmailVerificationLink = async (
    env: Bindings,
    username: string,
    email: string,
    email_verification_code: string,
) => {
    const emailVerificationLink = `${env.ENVIRONMENT === 'dev' ? 'http://localhost:8183' : 'https://exotext.com'}/verify_email?code=${email_verification_code}`;

    const emailBody = `Welcome to exotext, ${username}!<br><br>Please, verify your email by clicking on <strong><a href="${emailVerificationLink}">this link</a></strong>.`;

    await sendEmail(env, email, 'Welcome to exotext', emailBody);
};

const send_password_reset_link = async (env: Bindings, email: string, password_reset_code: string) => {
    const passwordResetLink = `${env.ENVIRONMENT === 'dev' ? 'http://localhost:8183' : 'https://exotext.com'}/reset_password?code=${password_reset_code}`;

    const emailBody = `You have requested to reset your password for your exotext account. If you did not request it, please ignore this email. Otherwise, please click on <strong><a href="${passwordResetLink}">this link</a></strong> to reset your password.`;

    await sendEmail(env, email, 'Password reset request', emailBody);
};

const createSessionSetCookieAndRedirect = async (
    c: Context,
    userId: number,
    email: string,
    redirectTo = '/',
    first_login = false,
) => {
    const sessionKey = randomHash(32);
    const kv_value = `${userId};${email}`;
    await c.env.SESSIONS_KV.put(sessionKey, kv_value);
    setCookie(c, 'exotext_session', sessionKey, {
        path: '/',
        domain: c.env.ENVIRONMENT === 'dev' ? '.localhost' : '.exotext.com',
        secure: true,
        httpOnly: true,
        maxAge: 34560000,
    });

    if (first_login) {
        return c.html(
            renderHTML(
                'Account created | exotext',
                raw(`<div class="flash">
                    Great! You are now registered and logged in. Check your email for a verification link. </div>`),
                true,
            ),
        );
    }

    return c.redirect(redirectTo);
};

export function randomHash(len: number): string {
    return Array.from(crypto.getRandomValues(new Uint8Array(Math.ceil(len / 2))), (b) =>
        `0${(b & 0xff).toString(16)}`.slice(-2),
    ).join('');
}

export async function hashPassword(password: string, providedSalt?: Uint8Array): Promise<[string, string]> {
    const encoder = new TextEncoder();
    // Use provided salt if available, otherwise generate a new one
    const salt = providedSalt || crypto.getRandomValues(new Uint8Array(16));

    const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(password), { name: 'PBKDF2' }, false, [
        'deriveBits',
        'deriveKey',
    ]);

    const key = await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256',
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt'],
    );
    const exportedKey = (await crypto.subtle.exportKey('raw', key)) as ArrayBuffer;

    const hashBuffer = new Uint8Array(exportedKey);
    const hashArray = Array.from(hashBuffer);
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    const saltHex = Array.from(salt)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

    return [hashHex, saltHex];
}

export async function verifyPassword(hash: string, salt: string, passwordAttempt: string): Promise<boolean> {
    const matchResult = salt.match(/.{1,2}/g);
    if (!matchResult) throw new Error('Invalid salt format');

    const saltUint = new Uint8Array(matchResult.map((byte) => Number.parseInt(byte, 16)));
    const [attemptHash, _] = await hashPassword(passwordAttempt, saltUint);
    return attemptHash === hash;
}

function checkUsername(username: string) {
    return /^[a-zA-Z0-9_]{3,16}$/.test(username);
}

function checkEmail(email: string) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export const handleNewBlogPost = async (c: Context) => {
    const body = await c.req.parseBody();
    const slug = body.address.toString();
    if (!slug) throw new Error('Address is required');
    const title = body.title.toString();
    if (!title) throw new Error('Title is required');

    const userId = c.get('USER_ID');

    try {
        const blog_insertion_results = await c.env.DB.prepare('INSERT INTO blogs (title, slug, user_id) values (?,?,?)')
            .bind(title, slug, userId)
            .run();

        if (blog_insertion_results.success) {
            return c.redirect(`https://${slug}.exotext.com`);
        }

        return c.redirect('/');
    } catch (err) {
        throw new Error('Something went horribly wrong.');
    }
};
