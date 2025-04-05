export const truncate = (s: string, len = 140) => {
    const txt = s.toString();
    const txt_length = txt.length;
    if (txt_length <= len) return txt;

    const sub_text = txt.substring(0, len).trim();
    const sub_text_array = sub_text.split(' ');
    const sub_text_length = sub_text_array.length;
    if (sub_text_length > 1) {
        sub_text_array.pop();
        return `${sub_text_array.map((word: string) => word.trim()).join(' ')}...`;
    }
    return `${sub_text.substring(0, len - 3)}...`;
};

export const sanitizeHTML = async (contentBlock: string): Promise<string> => {
    const sanitizedContentBlock = new HTMLRewriter()
        .on('*', {
            element(element) {
                // Remove potentially dangerous attributes
                const dangerousAttributes = [
                    'onabort',
                    'onanimationcancel',
                    'onanimationend',
                    'onanimationiteration',
                    'onanimationstart',
                    'onauxclick',
                    'onblur',
                    'oncancel',
                    'oncanplay',
                    'oncanplaythrough',
                    'onchange',
                    'onclick',
                    'onclose',
                    'oncontextmenu',
                    'oncopy',
                    'oncuechange',
                    'oncut',
                    'ondblclick',
                    'ondrag',
                    'ondragend',
                    'ondragenter',
                    'ondragleave',
                    'ondragover',
                    'ondragstart',
                    'ondrop',
                    'ondurationchange',
                    'onemptied',
                    'onended',
                    'onerror',
                    'onfocus',
                    'onformdata',
                    'onfullscreenchange',
                    'onfullscreenerror',
                    'ongotpointercapture',
                    'oninput',
                    'oninvalid',
                    'onkeydown',
                    'onkeypress',
                    'onkeyup',
                    'onload',
                    'onloadeddata',
                    'onloadedmetadata',
                    'onloadstart',
                    'onlostpointercapture',
                    'onmousedown',
                    'onmouseenter',
                    'onmouseleave',
                    'onmousemove',
                    'onmouseout',
                    'onmouseover',
                    'onmouseup',
                    'onpaste',
                    'onpause',
                    'onplay',
                    'onplaying',
                    'onpointercancel',
                    'onpointerdown',
                    'onpointerenter',
                    'onpointerleave',
                    'onpointermove',
                    'onpointerout',
                    'onpointerover',
                    'onpointerup',
                    'onprogress',
                    'onratechange',
                    'onreset',
                    'onresize',
                    'onscroll',
                    'onsecuritypolicyviolation',
                    'onseeked',
                    'onseeking',
                    'onselect',
                    'onselectionchange',
                    'onselectstart',
                    'onslotchange',
                    'onstalled',
                    'onsubmit',
                    'onsuspend',
                    'ontimeupdate',
                    'ontoggle',
                    'ontouchcancel',
                    'ontouchend',
                    'ontouchmove',
                    'ontouchstart',
                    'ontransitioncancel',
                    'ontransitionend',
                    'ontransitionrun',
                    'ontransitionstart',
                    'onvolumechange',
                    'onwaiting',
                    'onwheel',
                ];
                for (const attr of dangerousAttributes) {
                    element.removeAttribute(attr);
                }

                // Sanitize href attributes
                if (element.tagName === 'a' && element.getAttribute('href')) {
                    const href = element.getAttribute('href');
                    if (href?.toLowerCase().startsWith('javascript:')) {
                        element.removeAttribute('href');
                    }
                }

                // Remove script and style tags
                if (element.tagName === 'script' || element.tagName === 'style') {
                    element.remove();
                }

                // Remove all iframes except for YouTube
                // if (element.tagName === 'iframe') {
                //     const src = element.getAttribute('src');
                //     if (!src || (!src.includes('youtube.com/embed/') && !src.includes('youtube-nocookie.com/embed/'))) {
                //         element.remove();
                //     }
                // }
            },
        })
        .transform(new Response(contentBlock))
        .text();

    return sanitizedContentBlock;
};

export function stripTags(s: string) {
    const stripped_text = new HTMLRewriter()
        .on('*', {
            text(textChunk) {
                // Keep the text content as-is, effectively stripping tags
                textChunk.after(textChunk.text, { html: false });
            },
            element(element) {
                // Remove all HTML elements
                element.removeAndKeepContent();
            },
        })
        .transform(new Response(s))
        .text();

    return stripped_text;
}

export function escapeHtml(unsafe: unknown): string {
    if (unsafe === null || unsafe === undefined) {
        return '';
    }

    return String(unsafe)
        .replace(/&/g, '&amp;') // & -> &amp;
        .replace(/</g, '&lt;') // < -> &lt;
        .replace(/>/g, '&gt;') // > -> &gt;
        .replace(/"/g, '&quot;') // " -> &quot;
        .replace(/'/g, '&#39;'); // ' -> &#39;
}
