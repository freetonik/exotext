import type { Context } from 'hono';
import { raw } from 'hono/html';
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
    .container{max-width: 680px;}
    .intro { margin-bottom: 6rem; }

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
    .features a {
        color: var(--color-link);
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

    .signup {
        margin-bottom: 6rem;
        max-width: 400px;
    }
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

        <form
            action="https://buttondown.com/api/emails/embed-subscribe/ExotextWaitList"
            method="post"
            target="popupwindow"
            onsubmit="window.open('https://buttondown.com/ExotextWaitList', 'popupwindow')"
            class="embeddable-buttondown-form"
            >
            <input class="form-group" type="email" name="email" id="bd-email" placeholder="your@email.com" />

            <input style="width: auto;" type="submit" value="Join waitlist" />

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
        <div class="feature">
            <h2>FEATURES</h2>
            <p>KaTeX support, code syntax highlighting, easy image attachments, and more. Our <a href="https://github.com/users/freetonik/projects/6">roadmap is public</a>.</p>
        </div>
    </section>

    <footer>
        <p>Made by <a href="https://hypergraph.fi/">Hypergraph Labs</a></p>
    </footer>`;
    return c.html(renderHTMLGeneral('Exotext', raw(inner), c.get('USER_LOGGED_IN'), { footer: false }));
};
