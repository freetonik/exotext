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

export const renderPostEditor = (title = '', content = '', slug = '') => {
    return `
    
    <script src="https://unpkg.com/tiny-markdown-editor@0.1.29/dist/tiny-mde.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/htmx/2.0.3/htmx.min.js" integrity="sha512-dQu3OKLMpRu85mW24LA1CUZG67BgLPR8Px3mcxmpdyijgl1UpCM1RtJoQP6h8UkufSnaHVRTUx98EQT9fcKohw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <style>
    .container { height:100%; padding: 1rem; }</style>
    <div class="editor-container">

    <form style="height: 100%; display: flex; flex-direction: column;" method="POST">

        <div class="title-input">
            <input id="post-title" name="post-title" type="text" placeholder="Post title" value="${title}" autofocus>
        </div>

        <div style="flex-grow: 1; height: 100%; display: flex; flex-direction: column;">
            <textarea id="txt" name="post-content" placeholder="Here we go..." rows=12>${content}</textarea>
            <div id="toolbar"></div>
            <div id="tinymde" style="height:300px; overflow-y:scroll; border: 1px solid var(--color-border); background-color: white;padding:0.25em;flex-grow: 1;"></div>
        </div>
        <div id="uploadedImages">
        </div>

        <div class="publishing-controls">
            <div class="markdown-help">
                :-)
            </div>
            <div class="buttons">
                <input type="submit" name="action" value="Publish">
                <input type="submit" name="action" value="Save">
                    
            </div>
        </div>


    </form>

    </div>

    <script>
        htmx.on('#form', 'htmx:afterOnLoad', function(evt) {
          console.log(evt.detail.xhr.response);
        });

    var tinyMDE = new TinyMDE.Editor({element: 'tinymde', textarea: "txt" });
    var commandBar = new TinyMDE.CommandBar({
        element: "toolbar",
        editor: tinyMDE,
        commands: ['bold', 'italic', 'strikethrough', '|', 'code', 'h2', 'ul', 'ol', 'blockquote', '|', 'insertLink', 'insertImage',]
    });

    tinyMDE.addEventListener("drop", async function (event) {
    let formData = new FormData();

    for (let i = 0; i < event.dataTransfer.items.length; i++) {
        if (event.dataTransfer.items[i].kind === "file") {
        let file = event.dataTransfer.items[i].getAsFile();
        formData.append("image", file);
        }
    }

    const response = await fetch('/upload', { method: 'POST', body: formData });
    result = await response.json();

    if (result.imageUrl) {
        tinyMDE.paste('\\n![](' + result.imageUrl +')\\n');

        const uploadedImagesDiv = document.getElementById('uploadedImages');
        const codeElement = document.createElement('code');
        codeElement.textContent = result.imageUrl;
        uploadedImagesDiv.appendChild(codeElement);

    } else {
        const uploadedImagesDiv = document.getElementById('uploadedImages');
        const codeElement = document.createElement('code');
        codeElement.textContent = result.error;
        uploadedImagesDiv.appendChild(codeElement);
    }
    });

    </script>

    <style>
    #uploadedImages code {
        display: inline-block;
        font-size: small;
        padding: 0.15em 0.5em;
    }
    #uploadedImages code:first-child {
        margin-top:1em;
    }
    .TinyMDE {
        background-color:#fff;
        color:#000;
        font-size:16px;
        line-height:24px;
        outline: none;
        padding:5px;
        height: 100%;
    }

    .TMBlankLine {
        height:24px;
    }

    .TMH1, .TMSetextH1 {
        font-size:22px;
        line-height:32px;
        font-weight:bold;
        margin-bottom:8px;
    }

    .TMSetextH1 {
        margin-bottom:0px;
    }

    .TMSetextH1Marker {
        margin-bottom:8px;
    }

    .TMH2, .TMSetextH2 {
        font-size:20px;
        line-height:28px;
        font-weight:bold;
        margin-bottom:4px;
    }

    .TMMark_TMCode {
        font-family:monospace;
        font-size:.9em;
    }

    .TMFencedCodeBacktick, .TMFencedCodeTilde, .TMIndentedCode, .TMCode {
        font-family:monospace;
        font-size:.9em;
        background-color:#e0e0e0;
    }

    .TMCodeFenceBacktickOpen, .TMCodeFenceTildeOpen {
        border-bottom: 1px solid #c0c0c0;
        font-family: monospace;
        font-size:.9em;
    }

    .TMCodeFenceBacktickClose, .TMCodeFenceTildeClose {
        border-top: 1px solid #c0c0c0;
        font-family: monospace;
        font-size:.9em;
    }

    .TMInfoString {
        color: #0000ff;
    }

    .TMCode {
        border:1px solid #c0c0c0;
        border-radius: 2px;
    }

    .TMBlockquote {
        font-style: italic;
        border-left:2px solid #c0c0c0;
        padding-left:10px;
        margin-left:10px;
    }

    .TMMark {
        color:#a0a0a0;
    }

    .TMMark_TMH1, .TMMark_TMH2 {
        color:#ff8080;
    }

    .TMMark_TMUL, .TMMark_TMOL {
        color:#ff8080;
    }

    .TMImage {
    text-decoration: underline;
    text-decoration-color: #00ff00;
    }

    .TMLink {
    text-decoration: underline;
    text-decoration-color: #0000ff;
    }

    .TMLinkLabel {
    text-decoration: underline;
    font-family: monospace;
    }

    .TMLinkLabel_Definition, .TMLinkLabel_Valid {
    color: #40c040;
    }

    .TMLinkLabel_Invalid {
    color: #ff0000;
    }

    .TMLinkTitle {
    font-style:italic;
    }

    .TMLinkDestination, .TMAutolink {
    text-decoration: underline;
    color: #0000ff;
    }

    .TMHR {
    position: relative;
    }

    .TMHR:before {
    content: '';
    position: absolute;
    bottom: 50%;
    left: 40%;
    border-bottom: 2px solid #808080;
    width: 20%;
    z-index:0;
    }

    .TMHTML, .TMHTMLBlock {
    font-family:monospace;
    font-size:.9em;
    color:#8000ff;
    }

    .TMHTMLBlock {
    color:#6000c0;
    }

    .TMCommandBar {
    height:24px;
    box-sizing: content-box;
    display:flex;
    -webkit-user-select: none;
            user-select: none;
    overflow-x: scroll;
        overflow-y: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin-bottom: 0.35em;
    }

    .TMCommandBar::-webkit-scrollbar {
    display: none;
    }

    .TMCommandButton {
    box-sizing: border-box;
    display: inline-block;
    height:24px;
    width:24px;
    padding:3px;
    margin-right:4px;
    color:#404040;
    fill:#404040;
    text-align: center;
    cursor: pointer;
    vertical-align: middle;
    font-size:20px;
    line-height:18px;
    font-family: sans-serif;
    }

    .TMCommandDivider {
    box-sizing: content-box;
    height:24px;
    margin-left:4px;
    margin-right:8px;
    width:0px;
    border-left:1px solid #c0c0c0;
    border-right:1px solid #ffffff;
    }

    .TMCommandButton_Active {
    font-weight:bold;
    color:#000080;
    background-color: #c0c0ff;
    fill:#000080;
    }

    .TMCommandButton_Inactive {
    background-color:#f8f8f8;
    }

    .TMCommandButton_Disabled {
    color:#a0a0a0;
    fill:#a0a0a0;
    }

    @media (hover: hover) {
    .TMCommandButton_Active:hover, .TMCommandButton_Disabled:hover, .TMCommandButton_Inactive:hover {
        background-color:#e0e0ff;
        fill:#000000;
    }
    }
    </style>
    `;
};
