const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false;

// Initialize CodeMirror
const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: 'markdown',
    theme: darkMode ? 'nord' : 'xq-light',
    tabSize: 2,
    autofocus: true,
    spellcheck: true,

    lineWrapping: true,
    lineNumbers: false,
    extraKeys: {
        'Cmd-B': handleBoldToggle,
        'Ctrl-B': handleBoldToggle,
        'Cmd-I': handleItalicToggle,
        'Ctrl-I': handleItalicToggle,
    },
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) editor.setOption('theme', 'nord');
    else editor.setOption('theme', 'xq-light');
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
                cm.replaceRange(selection, { line: from.line, ch: newStart }, { line: to.line, ch: newEnd });
            }
        } else {
            // Add new markers
            cm.replaceSelection(markers + selection + markers);
            if (keepSelection) {
                cm.setSelection(
                    { line: from.line, ch: from.ch + markers.length },
                    { line: to.line, ch: to.ch + markers.length },
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
editor.on('paste', async (cm, e) => {
    // Prevent default paste behavior
    e.preventDefault();

    const clipboardData = e.clipboardData || window.clipboardData;
    const selection = cm.somethingSelected() ? cm.getSelection() : '';

    // Check for image data in clipboard
    const hasImage = Array.from(clipboardData.items).some((item) => item.type.startsWith('image/'));

    if (hasImage) {
        // Handle image paste
        for (const item of clipboardData.items) {
            if (item.type.startsWith('image/')) {
                const blob = item.getAsFile();
                toggleLoadingIndicator(true);
                try {
                    // Create FormData and append the blob as an image file
                    const formData = new FormData();
                    formData.append('image', blob, 'pasted-image.png');

                    // Use the existing upload endpoint
                    const response = await fetch('/upload', {
                        method: 'POST',
                        body: formData,
                    });

                    const result = await response.json();

                    if (result.imageUrl) {
                        // Insert the markdown image syntax at cursor position
                        const imageMarkdown = `![${selection}](${result.imageUrl})`;
                        cm.replaceSelection(imageMarkdown);
                    } else {
                        console.error('Image upload failed:', result.error);
                        cm.replaceSelection(result.error || 'Failed to upload image');
                    }
                } catch (error) {
                    console.error('Error uploading pasted image:', error);
                    cm.replaceSelection('Error uploading image');
                }
                toggleLoadingIndicator(false);
                break; // Only handle the first image
            }
        }
    } else {
        // Handle text paste
        const pastedText = clipboardData.getData('text');

        if (selection && pastedText.trim().toLowerCase().startsWith('http')) {
            // Convert selected text to markdown link
            cm.replaceSelection(`[${selection}](${pastedText})`);
        } else {
            // Regular text paste
            cm.replaceSelection(pastedText);
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
        formData.append('image', file);
        toggleLoadingIndicator(true);
        const response = await fetch('/upload', { method: 'POST', body: formData });
        result = await response.json();

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
    toggleLoadingIndicator(false);
});

// Prevent default drag over behavior
editor.on('dragover', (cm, event) => {
    event.preventDefault();
});

const { Marked } = window.marked;
const { markedHighlight } = globalThis.markedHighlight;
const marked = new Marked(
    markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
    }),
);

marked.use(
    markedKatex({
        throwOnError: false,
    }),
);

marked.use(markedFootnote());
marked.use(markedAlert());

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

    // Preview button click handler
    previewLink.addEventListener('click', async (e) => {
        e.preventDefault();
        const postDate = new Date().toLocaleDateString('en-UK', date_format_opts);
        const preprocessedMarkdown = preProcessMarkdown(editor.getValue());

        try {
            const ht = `<nav> <a target="_blank" href="/" class="blog-link">←
            ${BLOG_TITLE}
            </a></nav> <article> <header class="post-header"> <h1>
            ${document.getElementById('post-title').value}
            </h1> <small class="label label-red">unsaved preview</small> <time class="post-date">
            ${postDate}
            </time> </header> <div class="post-content">
            ${marked.parse(preprocessedMarkdown, { sanitize: true })}
            </div> </article>`;

            previewContent.innerHTML = ht;
            openOverlay();
            previewLink.blur();
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

function preProcessMarkdown(text) {
    return convertYouTubeLinksToEmbeds(text);
}

function convertYouTubeLinksToEmbeds(text) {
    // Split the input into lines, preserving empty lines
    const lines = text.split('\n');

    // Process each line
    const processedLines = lines.map((line, index) => {
        const trimmedLine = line.trim();

        // Skip if line isn't empty but contains more than just a URL
        if (!trimmedLine || trimmedLine.includes(' ')) {
            return line;
        }

        // Check if line is isolated by newlines or is first/last line
        const isFirstLine = index === 0;
        const isLastLine = index === lines.length - 1;
        const hasPrecedingNewline = isFirstLine || lines[index - 1].trim() === '';
        const hasFollowingNewline = isLastLine || lines[index + 1].trim() === '';

        if (!hasPrecedingNewline || !hasFollowingNewline) {
            return line;
        }

        try {
            const url = new URL(trimmedLine);

            if (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') {
                const videoId = url.searchParams.get('v');
                if (videoId) {
                    return `<p><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;   gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></p>`;
                }
            } else if (url.hostname === 'youtu.be') {
                const videoId = url.pathname.slice(1);
                if (videoId) {
                    return `<p><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;   gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></p>`;
                }
            }
        } catch (e) {
            return line;
        }

        return line;
    });

    return processedLines.join('\n');
}

function toggleLoadingIndicator(show) {
    if (show) {
        document.getElementById('lds-ripple').style.display = 'block';
        setTimeout(() => {
            document.body.style.cursor = 'wait';
        }, 0);
    } else {
        document.getElementById('lds-ripple').style.display = 'none';
        setTimeout(() => {
            document.body.style.cursor = 'initial';
        }, 0);
    }
}
