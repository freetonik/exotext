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

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/markdown/markdown.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossorigin="anonymous">

        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>

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
            <input id="post-slug" name="post-slug" type="text" placeholder="slug" value="${slug}">
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

            // Preview link click handler
            previewLink.addEventListener('click', async (e) => {
                e.preventDefault();

                try {
                    const response = await fetch('preview', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "post-title": document.getElementById('post-title').value,
                            "post-content": editor.getValue(),
                            "blog-title": "${blog_title}"
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Preview request failed');
                    }

                    const html = await response.text();
                    previewContent.innerHTML = html;
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
