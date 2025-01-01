// Initialize CodeMirror
const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: 'markdown',
    theme: 'default',
    tabSize: 2,
    autofocus: true,
    spellcheck: true,

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

const katexOptions = {
    throwOnError: false,
};

marked.use(markedKatex(katexOptions));

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
            </div> </article>`

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

function preProcessMarkdown(text) {
    return convertYouTubeUrlToEmbed(text);
}

function convertYouTubeUrlToEmbed(text) {
    // Match YouTube URLs that are on their own line
    // - youtube.com/watch?v=VIDEO_ID
    // - youtu.be/VIDEO_ID
    // - youtube.com/embed/VIDEO_ID
    const youtubeRegex = /(?<=\n|^)(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?=\n|$)/g;

    return text.replace(youtubeRegex, (match, videoId) => {
      // Create responsive embed wrapper with 16:9 aspect ratio
      return `
<p>
    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/HjSyYZ5M2H8?si=${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;   gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>`;
    });
  }

