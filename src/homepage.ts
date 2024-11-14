import type { Context } from 'hono';
import { raw } from 'hono/html';
import { sendEmail } from './email';
import { renderHTMLGeneral } from './htmltools';

export const handleHomepage = async (c: Context) => {
    let userBlock = `
    <a href="/login" class="blog-link">sign in</a>
    <a href="/signup" class="blog-link">sign up</a>
    `;
    if (c.get('USER_LOGGED_IN')) {
        userBlock = `<a class="blog-link" href="/my/account">my account</a>`;
    }
    const inner = `
    <style>
    .intro {
        margin-bottom: 6rem;
    }

    h1.landing {
        font-size: 2.5rem;
        line-height: 1.2;
        font-weight: normal;
        margin-bottom: 2rem;
        max-width: 32ch;
    }
    .lead {
        font-size: 1.2rem;
        margin-bottom: 3rem;
        max-width: 55ch;
    }
    .features {
        border-top: 1px solid var(--color-text);
        padding-top: 3rem;
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
    }

    .feature {
        max-width: 45ch;
    }

    .feature h2 {
        font-size: 1rem;
        font-weight: normal;
        font-family: monospace;
        margin-bottom: 0.5rem;
        letter-spacing: 0.05em;
    }

    /* Form */
    .signup {
        margin-bottom: 6rem;
        max-width: 400px;
    }
    .container{max-width: 680px;}
    </style>
    <nav>
        <a href="/" class="logo">EXOTEXT</a>
        <div class="menu">
            ${userBlock}
        </div>
    </nav>

    <section class="intro">
        <h1>A blogging platform<br>for the craft of clarity and focus.</h1>
        <p class="lead">Exotext gets out of your way and lets you breath. A modern, minimalistic medium for your beautiful words.</p>
    </section>

    <section class="signup">
        <form action="/waiting_list" method="POST">
            <input class="form-group" type="email" id="email" name="email" placeholder="your@email.com" required>
            <button type="submit">Join waiting list</button>
        </form>

    </section>

    <section class="features">
        <div class="feature">
            <h2>TYPOGRAPHY</h2>
            <p>Every detail is considered—from line length and leading to font choice and hierarchy—creating an environment where words carry their full weight.</p>
        </div>
        <div class="feature">
            <h2>SIMPLICITY</h2>
            <p>No analytics. No social media integration. No unnecessary features. Just a clean canvas for your ideas.</p>
        </div>
        <div class="feature">
            <h2>FREEDOM</h2>
            <p>Use your custom domain. Export your data in Markdown and fully rendered HTML for easy migration.</p>
        </div>
    </section>

    <footer>
        <p>Made by <a href="https://hypergraph.fi/">Hypergraph Labs</a></p>
    </footer>
        `;
    return c.html(renderHTMLGeneral('Exotext', raw(inner), c.get('USER_LOGGED_IN'), { footer: false }));
};

export const handleWaitingListPOST = async (c: Context) => {
    const body = await c.req.parseBody();
    console.log('body', body);
    const email = body.email.toString().toLowerCase();

    if (!email) {
        throw new Error('No email provided');
    }

    // check if email is already in the waiting list
    const existing = await c.env.DB.prepare('SELECT * FROM waiting_list WHERE email = ?').bind(email).first();
    if (existing) {
        throw new Error('You are already on the waiting list');
    }

    try {
        await c.env.DB.prepare('INSERT INTO waiting_list (email) values (?)').bind(email).run();
    } catch (e) {
        throw new Error('Something went wrong. Please try again later.');
    }

    const emailBody =
        '<p>Thank you for your interest. You are now on the waiting list for Exotext. You will get an invitation email soon.</p><p>Send me an message to <a href="mailto:hello@rakhim.org">hello@rakhim.org</a> if you have any questions or if you want to suggest ideas for the development of Exotext.</p><p>— Cheers,<br>Rakhim.</p>';

    await sendEmail(c.env, email, 'Exotext waiting list', emailBody);

    return c.html(
        renderHTMLGeneral(
            'You are in!',
            raw(
                `<div class="flash flash-success">You are now on the waiting list. You'll get one email now, and the invitation email when it's your turn to enjoy Exotext. And you will enjoy it. YOU. WILL.</div>`,
            ),
            false,
            { footer: false },
        ),
    );
};
