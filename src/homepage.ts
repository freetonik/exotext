import type { Context } from 'hono';
import { raw } from 'hono/html';
import { renderHTML } from './htmltools';

export const handleHomepage = async (c: Context) => {
    if (c.get('USER_LOGGED_IN')) {
        return c.redirect('/my/account');
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
        color: #333;
    }
    .features {
        border-top: 1px solid #ddd;
        padding-top: 3rem;
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
        color: #333;
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
    </style>
    
    
    <style>.container{max-width: 680px;}</style>
    <nav>
        <a href="/" class="logo">EXOTEXT</a>
        <div class="menu">
        <a href="/login" class="blog-link">login</a>
        <a href="/signup" class="blog-link">sign up</a>
        </div>
    </nav>

    <section class="intro">
        <h1>A blogging platform focused on simplicity, typography, and craft.</h1>
        <p class="lead">Exotext strips away the distractions of modern publishing platforms, creating a space where your writing can breathe and your readers can focus.</p>
    </section>

    <section class="signup">
        <input class="form-group" type="email" placeholder="your@email.com" required>
        <button type="submit">Join waiting list</button>
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
            <h2>PHILOSOPHY</h2>
            <p>Built on the belief that good writing needs space to develop, and good reading requires focus. Nothing more, nothing less.</p>
        </div>
    </section>

    <footer>
        <p>Exotext by <a href="https://hypergraph.fi/">Hypergraph Labs</a></p>
    </footer>
        `;
    return c.html(renderHTML('Exotext', raw(inner), c.get('USER_LOGGED_IN'), { footer: false }));
};
