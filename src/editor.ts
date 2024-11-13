import { renderedCSS } from './css';

export const renderPostEditor = (title = '', content = '', slug = '', blog_title = '') => {
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
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.js" integrity="sha512-8RnEqURPUc5aqFEN04aQEiPlSAdE0jlFS/9iGgUyNtwFnSKCXhmB6ZTNl7LnDtDWKabJIASzXrzD0K+LYexU9g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/default.min.css" integrity="sha512-hasIneQUHlh06VNBe7f6ZcHmeRTLIaQWFd43YriJ0UND19bvYRauxthDg8E4eVNPm9bRUhr5JGeqH7FRFXQu5g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/highlight.min.js" integrity="sha512-6yoqbrcLAHDWAdQmiRlHG4+m0g/CT/V9AGyxabG8j7Jk8j3r3K6due7oqpiRMZqcYe9WM2gPcaNNxnl2ux+3tA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.7/katex.min.css" integrity="sha512-t2ALGTyUR6g1HJiHCmSTge2yGseGofdO88Q+zOWQx/N0ikecVw0YuyOet9xZDV8+Vx0Y0n1a3f3Qx3V9CcnsKA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.7/katex.min.js" integrity="sha512-EKW5YvKU3hpyyOcN6jQnAxO/L8gts+YdYV6Yymtl8pk9YlYFtqJgihORuRoBXK8/cOIlappdU6Ms8KdK6yBCgA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/markdown/markdown.min.js" integrity="sha512-DmMao0nRIbyDjbaHc8fNd3kxGsZj9PCU6Iu/CeidLQT9Py8nYVA5n0PqXYmvqNdU+lCiTHOM/4E7bM/G8BttJg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/15.0.0/lib/marked.umd.min.js" integrity="sha512-0oATHzUMCnInjiTnCGLO89UZaxHjTxLmO6pjgEyEtrENCNm4LbyC7F6T3is+085e4EtOl+mFqwQyR0y6v6aqDQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/marked-highlight/2.2.1/index.umd.min.js" integrity="sha512-T5TNAGHd65imlc6xoRDq9hARHowETqOlOGMJ443E+PohphJHbzPpwQNBtcpmcjmHmQKLctZ/W3H2cY/T8EGDPA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <script src="https://cdn.jsdelivr.net/npm/marked-katex-extension@5.1.3/lib/index.umd.min.js"></script>

        <style>${renderedCSS}</style>
    </head>
    <body>

    <div class="editor-container">

        <form style="height: 100%; display: flex; flex-direction: column;" method="POST">

            <div class="title-input">
                <input id="post-title" name="post-title" type="text" placeholder="Post title" value="${title}">
            </div>

            <div style="flex-grow: 1; height: 100%; display: flex; flex-direction: column; overflow: hidden;">
                <textarea id="editor" name="post-content" placeholder="Here we go..." rows=12>${content}</textarea>
            </div>

        <div class="publishing-controls">
            <div class="url-input-container">
                <span class="url-prefix">rakhim.exotext.com/</span>
                <input id="post-slug" name="post-slug" type="text" class="url-suffix" placeholder="slug" value="${slug}">
            </div>

            <div class="buttons">
                <a class="button button-secondary" href="#" id="preview-link">Preview</a>
                <input class="button-secondary" type="submit" name="action" value="Save as draft">
                <input type="submit" name="action" value="Publish">
            </div>
        </div>

        </form>
    </div>

    <div id="preview-overlay" class="overlay">
        <button class="close-button" id="close-preview">Close preview (ESC)</button>
        <div class="preview-content" id="preview-content"></div>
    </div>

    <script>
        // Initialize CodeMirror
        const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
            mode: 'markdown',
            theme: 'default',
            tabSize: 2,
            autofocus: true,

            lineWrapping: true,
            lineNumbers: false,
            extraKeys: {
                'Cmd-B': handleBoldToggle,
                'Ctrl-B': handleBoldToggle,
                'Cmd-I': handleItalicToggle,
                'Ctrl-I': handleItalicToggle
            }
        });

        // Helper function to check if text contains markdown markers
        function hasMarkdownMarkers(text, markers) {
            return text.startsWith(markers) && text.endsWith(markers);
        }

        // Helper function to remove markdown markers
        function removeMarkdownMarkers(text, markers) {
            if (hasMarkdownMarkers(text, markers)) {
                return text.slice(markers.length, -markers.length);
            }
            return text;
        }

        // Helper function to surround text with markers
        function surroundSelection(cm, markers, keepSelection = true) {
            const selection = cm.getSelection();
            const from = cm.getCursor('from');
            const to = cm.getCursor('to');

            // Get the full line content to check for existing markers
            const line = cm.getLine(from.line);
            const selectionStart = from.ch;
            const selectionEnd = to.line === from.line ? to.ch : line.length;

            // Check if selection already has markers
            if (hasMarkdownMarkers(selection, markers)) {
                // Remove markers from the selection itself
                const newText = removeMarkdownMarkers(selection, markers);
                cm.replaceSelection(newText);
            } else {
                // Check if selection is part of a larger marked text
                let startSearch = Math.max(0, selectionStart - markers.length);
                let endSearch = Math.min(line.length, selectionEnd + markers.length);
                let surroundingText = line.substring(startSearch, endSearch);

                let markersBefore = surroundingText.substring(0, markers.length) === markers;
                let markersAfter = surroundingText.substring(surroundingText.length - markers.length) === markers;

                if (markersBefore && markersAfter) {
                    // Remove markers from the larger text
                    let newStart = from.ch - markers.length;
                    let newEnd = to.ch + markers.length;
                    if (newStart >= 0 && newEnd <= line.length) {
                        cm.replaceRange(selection,
                            {line: from.line, ch: newStart},
                            {line: to.line, ch: newEnd}
                        );
                    }
                } else {
                    // Add new markers
                    cm.replaceSelection(markers + selection + markers);
                    if (keepSelection) {
                        cm.setSelection(
                            {line: from.line, ch: from.ch + markers.length},
                            {line: to.line, ch: to.ch + markers.length}
                        );
                    }
                }
            }
        }

        // Handle bold toggle
        function handleBoldToggle(cm) {
            surroundSelection(cm, '**', true);
        }

        // Handle italic toggle
        function handleItalicToggle(cm) {
            surroundSelection(cm, '_', true);
        }

        // Handle paste event
        editor.on('paste', (cm, e) => {
            // Check if there's a selection
            if (cm.somethingSelected()) {
                const selection = cm.getSelection();

                // Get clipboard data
                const clipboardData = e.clipboardData || window.clipboardData;
                const pastedText = clipboardData.getData('text');

                // Check if pasted text is a URL starting with http
                if (pastedText.trim().toLowerCase().startsWith('http')) {
                    e.preventDefault();
                    cm.replaceSelection('[' + selection + '](' + pastedText + ')');
                }
            }
        });

        // Handle drag and drop
        editor.on('drop', async (cm, event) => {
            event.preventDefault();

            const file = event.dataTransfer.files[0];
            if (!file || !file.type.startsWith('image/')) {
                return;
            }

            try {

                let formData = new FormData();
                formData.append("image", file);
                console.log(formData);

                const response = await fetch('/upload', { method: 'POST', body: formData });
                const res1 = await response;
                console.log(res1);
                result = await response.json();
                console.log(result);

                if (result.imageUrl) {
                    const imageMarkdown = '![]' + '(' + result.imageUrl + ')';
                    cm.replaceRange(imageMarkdown, cm.getCursor());
                } else {
                    cm.replaceRange(result.error, cm.getCursor());
                    codeElement.textContent = result.error;
                }


            } catch (error) {
                console.error('Error uploading image:', error);
            }
        });

        // Prevent default drag over behavior
        editor.on('dragover', (cm, event) => {
            event.preventDefault();
        });

        const { Marked } = window.marked;
        const {markedHighlight} = globalThis.markedHighlight;
        const marked = new Marked(
        markedHighlight({
            emptyLangClass: 'hljs',
            langPrefix: 'hljs language-',
            highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
            }
        })
        );

        const options = {
            throwOnError: false,
        };

        marked.use(markedKatex(options));

        document.addEventListener('DOMContentLoaded', () => {
            const previewLink = document.getElementById('preview-link');
            const overlay = document.getElementById('preview-overlay');
            const closeButton = document.getElementById('close-preview');
            const previewContent = document.getElementById('preview-content');


            // Function to close overlay
            const closeOverlay = () => {
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            };

            // Function to open overlay
            const openOverlay = () => {
                overlay.style.display = 'block';
                document.body.style.overflow = 'hidden';
            };

            const date_format_opts = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            };


            // Preview link click handler
            previewLink.addEventListener('click', async (e) => {
                e.preventDefault();
                const postDate = new Date().toLocaleDateString('en-UK', date_format_opts);

                try {
                    const ht = '<nav> <a target="_blank" href="/" class="blog-link">← '
                    + "${blog_title}"
                    + '</a></nav> <article> <header class="post-header"> <h1>'
                    + document.getElementById('post-title').value
                    + '</h1> <small class="label label-red">unsaved preview</small> <time class="post-date">'
                    + postDate
                    + '</time> </header> <div class="post-content">'
                    + marked.parse(editor.getValue(), { sanitize: true })
                    + '</div> </article>'

                    previewContent.innerHTML = ht;
                    openOverlay();
                } catch (error) {
                    console.error('Preview error:', error);
                    alert('Failed to generate preview');
                }
            });

            // Close button click handler
            closeButton.addEventListener('click', closeOverlay);

            // Escape key handler
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && overlay.style.display === 'block') {
                    closeOverlay();
                }
            });
        });
    </script>
    </body>
    </html>
    `;
};
