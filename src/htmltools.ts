import { html, raw } from 'hono/html';

export const renderHTMLGeneral = (
    title: string,
    inner: string,
    user_logged_in: boolean,
    customize = {
        footer: true,
    },
) => {
    const footer = customize.footer
        ? raw(`<footer>
            <p>Powered by <a href="https://exotext.com">Exotext</a></p>
        </footer>`)
        : '';

    return html`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <meta name="description" content="${title}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/x-icon" href="/favicon.ico">
        <link rel="stylesheet" href="/assets/css/styles.css">
    </head>
    <body>
    <div class="container">
        ${inner}
        ${footer}
    </div>

    </body>
    </html>`;
};

export const renderHTMLBlog = (title: string, inner: string, customHead?: string, customFooterContent?: string, theme?: string) => {
    return html`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <meta name="description" content="${title}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/x-icon" href="/favicon.ico">

        <link rel="alternate" type="application/rss+xml" title="${title}" href="/rss.xml" />
        <link rel="stylesheet" href="/assets/css/styles.css">
        <link rel="stylesheet" href="/assets/css/katex.css">
        <link rel="stylesheet" href="/assets/css/highlight-js.css">
        <link rel="stylesheet" href="/assets/themes/${theme || 'default'}.css">
        ${raw(customHead || '')}
    </head>
    <body>
    <div class="container">
        ${inner}
        <footer>
            <p>${raw(customFooterContent || 'Powered by <a href="https://exotext.com">Exotext</a>')}</p>
        </footer>
    </div>

    </body>
    </html>`;
};
