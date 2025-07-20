import { escapeHtml } from './utils';

export const renderPostEditor = (
    postId: number,
    title = '',
    content = '',
    slug = '',
    blog_title = '',
    pub_date = '',
) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <meta name="description" content="${title}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJtMTIuNjcyLjY2OCAzLjA1OSA2LjE5NyA2LjgzOC45OTNhLjc1Ljc1IDAgMCAxIC40MTYgMS4yOGwtNC45NDggNC44MjMgMS4xNjggNi44MTJhLjc1Ljc1IDAgMCAxLTEuMDg4Ljc5TDEyIDE4LjM0N2wtNi4xMTYgMy4yMTZhLjc1Ljc1IDAgMCAxLTEuMDg4LS43OTFsMS4xNjgtNi44MTEtNC45NDgtNC44MjNhLjc0OS43NDkgMCAwIDEgLjQxNi0xLjI3OWw2LjgzOC0uOTk0TDExLjMyNy42NjhhLjc1Ljc1IDAgMCAxIDEuMzQ1IDBaIj48L3BhdGg+PC9zdmc+" />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.css" integrity="sha512-uf06llspW44/LZpHzHT6qBOIVODjWtv4MxCricRxkzvopAlSWnTf6hpZTFxuuZcuNE9CBQhqE0Seu1CoRk84nQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/theme/nord.min.css" integrity="sha512-sPc4jmw78pt6HyMiyrEt3QgURcNRk091l3dZ9M309x4wM2QwnCI7bUtsLnnWXqwBMECE5YZTqV6qCDwmC2FMVA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/theme/xq-light.min.css" integrity="sha512-GKc0rRW0tbrkkWJpSugASKdO9KFVJ2IQjFmkNo9Vr0F+HWIicZZkQpE3v954AIh7GJy8Rn8n4Oa8qAl8TKleeA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.js" integrity="sha512-8RnEqURPUc5aqFEN04aQEiPlSAdE0jlFS/9iGgUyNtwFnSKCXhmB6ZTNl7LnDtDWKabJIASzXrzD0K+LYexU9g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/highlight.min.js" integrity="sha512-6yoqbrcLAHDWAdQmiRlHG4+m0g/CT/V9AGyxabG8j7Jk8j3r3K6due7oqpiRMZqcYe9WM2gPcaNNxnl2ux+3tA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js" integrity="sha512-LQNxIMR5rXv7o+b1l8+N1EZMfhG7iFZ9HhnbJkTp4zjNr5Wvst75AqUeFDxeRUa7l5vEDyUiAip//r+EFLLCyA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/markdown/markdown.min.js" integrity="sha512-DmMao0nRIbyDjbaHc8fNd3kxGsZj9PCU6Iu/CeidLQT9Py8nYVA5n0PqXYmvqNdU+lCiTHOM/4E7bM/G8BttJg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/15.0.0/lib/marked.umd.min.js" integrity="sha512-0oATHzUMCnInjiTnCGLO89UZaxHjTxLmO6pjgEyEtrENCNm4LbyC7F6T3is+085e4EtOl+mFqwQyR0y6v6aqDQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/marked-highlight/2.2.1/index.umd.min.js" integrity="sha512-T5TNAGHd65imlc6xoRDq9hARHowETqOlOGMJ443E+PohphJHbzPpwQNBtcpmcjmHmQKLctZ/W3H2cY/T8EGDPA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdn.jsdelivr.net/npm/marked-footnote/dist/index.umd.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/marked-alert@2.1.2/dist/index.umd.min.js"></script>

        <script src="https://cdn.jsdelivr.net/npm/marked-katex-extension@5.1.3/lib/index.umd.min.js"></script>

        <script> const BLOG_TITLE="${blog_title}"; </script>
        <link rel="stylesheet" href="/assets/css/styles.css">
    </head>
    <body>

    <div class="editor-container">
        <form style="height: 100%; display: flex; flex-direction: column;" method="POST" action="/${postId}" >

            <div class="title-input">
                <input id="post-title" name="post-title" type="text" placeholder="Post title" value="${escapeHtml(title)}">
            </div>

            <div style="flex-grow: 1; height: 100%; display: flex; flex-direction: column; overflow: hidden;">
                <textarea id="editor" name="post-content" placeholder="Here we go..." rows=12>${content}</textarea>
            </div>

            <div class="publishing-controls">
                <input id="post-slug" name="post-slug" type="text" class="url-suffix" placeholder="slug" value="${slug}">

                <div class="buttons">
                    <button type="button" class="button button-secondary" id="preview-link">Preview</button>
                    <input class="button-secondary" type="submit" name="action" value="Save as draft">
                    <input type="submit" name="action" value="Publish">
                </div>
            </div>

            <details class="publishing-controls-details">
                <summary>Customize publication date</summary>
                <input type="date" id="date" name="date" value="${pub_date}">
            </details>

            <!--inner divs of lds-ripple are needed for animation-->
            <div id="lds-ripple" class="lds-ripple"><div></div><div></div></div>

        </form>
    </div>

    <div id="preview-overlay" class="overlay">
        <button class="close-button" id="close-preview">Close preview (ESC)</button>
        <div class="preview-content" id="preview-content"></div>
    </div>


    <script src="/assets/js/editor.js"></script>
    </body>
    </html>
    `;
};
