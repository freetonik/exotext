import { html, raw } from 'hono/html';
import { renderedCSS } from './css';

export const renderHTML = (
    title: string,
    inner: string,
    user_logged_in: boolean,
    customize = {
        footer: true,
    },
) => {
    const userBlock = user_logged_in
        ? `<a href="/my/account">account</a>`
        : `<span><a href="/login" class="bold">Log in</a> | <a class="bold" href="/signup">Sign up</a></span>`;

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
        <link rel="shortcut icon" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJtMTIuNjcyLjY2OCAzLjA1OSA2LjE5NyA2LjgzOC45OTNhLjc1Ljc1IDAgMCAxIC40MTYgMS4yOGwtNC45NDggNC44MjMgMS4xNjggNi44MTJhLjc1Ljc1IDAgMCAxLTEuMDg4Ljc5TDEyIDE4LjM0N2wtNi4xMTYgMy4yMTZhLjc1Ljc1IDAgMCAxLTEuMDg4LS43OTFsMS4xNjgtNi44MTEtNC45NDgtNC44MjNhLjc0OS43NDkgMCAwIDEgLjQxNi0xLjI3OWw2LjgzOC0uOTk0TDExLjMyNy42NjhhLjc1Ljc1IDAgMCAxIDEuMzQ1IDBaIj48L3BhdGg+PC9zdmc+" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossorigin="anonymous">

        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
        <style>${renderedCSS}</style>
    </head>
    <body>
    <div class="container">
        ${inner}
        ${footer}
    </div>

    </body>
    </html>`;
};

const dateFormatOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

export const renderItemShort = (
    item_sqid: string,
    title: string,
    url: string,
    feed_title?: string,
    feed_sqid?: string,
    pub_date?: string,
    summary?: string,
) => {
    const divClass = summary ? 'item-short' : 'item-tiny';
    const postDate = pub_date ? `${new Date(pub_date).toLocaleDateString('en-UK', dateFormatOptions)} | ` : '';
    const feedLink = feed_title ? `<a href="/blogs/${feed_sqid}">${feed_title}</a> | ` : '';
    const summaryContent = summary ? `<p class="item-summary">${summary}</p>` : '';

    return `
    <div class="${divClass}">
        <a href="/items/${item_sqid}" class="bold no-color no-underline">${title}</a> <br>
        <div class="muted">
            <small>
                ${feedLink}
                <span>${postDate}</span>
                <a class="no-underline no-color" href="${url}">original</a>
            </small>
        </div>
        ${summaryContent}
    </div>
    `;
};
