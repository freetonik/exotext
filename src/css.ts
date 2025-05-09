// This file is auto-generated. Do not edit directly.
import { raw } from 'hono/html';
export const renderedCSS = raw(`
:root {
    --font-serif: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
    --font-sans: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif;
    --font-monospace: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;

    --color-text: #2c353d;
    --color-secondary: #666;
    --color-bg: #fcfcfc;
    --color-success: #2d503b;
    --color-warning: #851d27;

    --button-secondary-bg: #f2f2f2;

    --color-border: #ddd;
    --color-link: #093795;
    --code-bg: #e3e1e1;

}

@media (prefers-color-scheme: dark) {
    :root {
        --color-text: #d8dee9;
        --color-secondary: #cdd3de;
        --color-bg: #2e3440;

        --button-secondary-bg: #252525;

        --color-border: #ddd;
        --color-link: #6fc8ff;
        --code-bg: #0c1117;
    }
}

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    height: 100%;
}

body {
    font-family: var(--font-serif);
    line-height: 1.6;
    color: var(--color-text);
    background: var(--color-bg);
    font-size: 18px;
    height: 100%;
    counter-reset: katexEqnNo mmlEqnNo;
}

blockquote {
    font-style: italic;
    border-left: 2px solid var(--color-warning);
    padding-left: 1em;
}

.container {
    max-width: 900px;
    margin: 0 auto;
    padding: 3rem 2rem;
}

.container-sm {
    max-width: 400px;
    margin: 0 auto;
    padding: 3rem 2rem;
    height: 100%;
}

.editor-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.quick-draft {
    margin-bottom: 3em;
}

details.quick-draft summary {
    cursor: pointer;
}


.quick-draft form textarea {
    resize: vertical;
    width: 100%;
    padding: 1em;
    background-color: var(--color-bg);
    color: var(--color-text);
}

.quick-draft form textarea:focus {
    outline-color: var(--color-border);
}

.quick-draft .buttons {
    max-width: 300px;
}

nav {
    margin-bottom: 4rem;
    font-size: 0.9rem;
    letter-spacing: 0.05em;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

nav .menu {
    display: flex;
    gap: 2rem;
}

.logo {
    font-family: var(--font-monospace);
    color: var(--color-text);
    text-decoration: none;
    font-size: 1rem;
}

h1 {
    font-size: 2rem;
    line-height: 1.2;
    font-weight: normal;
    margin-bottom: 1rem;
}


/* ================================================================================================================== */
/* SERVICE PAGES: login, sign up, reset password */
.service-page nav {
    margin-bottom: 4rem;
    text-align: center;
    display: block;
}

.service-page h1 {
    margin-bottom: 1.5rem;
    text-align: center;
}

.service-page p {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--secondary-text);
}


/* ================================================================================================================== */
/* FORMS */
.form-group {
    margin-bottom: 1.5rem;
}

input {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    font-family: inherit;
    border: 1px solid var(--color-border);
    background: var(--color-bg);
    color: var(--color-text);
}

label {
    display: block;
    font-family: monospace;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    color: var(--color-secondary);
}

button,
input[type="submit"],
.button {
    padding: 0.75rem 2rem;
    font-size: 0.9rem;
    font-family: monospace;
    letter-spacing: 0.05em;
    cursor: pointer;
    border: none;
    color: var(--color-bg);
    background: var(--color-text);
    text-decoration: none;
}

button:hover,
input[type="submit"]:hover,
.button:hover {
    opacity: 0.9;
    /* background-color: var(--color-secondary); */
}

button.button-secondary,
input[type="submit"].button-secondary,
.button-secondary {
    color: var(--color-text);
    background: var(--button-secondary-bg);
}

button.button-secondary:hover,
input[type="submit"].button-secondary:hover,
.button-secondary:hover {
    opacity: 0.9;
}

.help-text {
    display: block;
    font-family: monospace;
    font-size: 0.8rem;
    margin-top: 0.5rem;
    color: var(--help-color);
}

/* Password Requirements */
.requirements {
    font-family: monospace;
    font-size: 0.8rem;
    color: var(--help-color);
    margin-top: 0.5rem;
}

.requirements ul {
    list-style: none;
    margin-top: 0.5rem;
}

.blog-url-preview {
    font-family: monospace;
    font-size: 0.9rem;
    color: var(--secondary-text);
    margin-top: 0.5rem;
}

.flash {
    padding: 1rem;
    text-align: center;
    margin: 2rem 0;
    border: 2px solid var(--color-border);
}

.flash a {
    color: inherit;
    font-weight: bold;
}

.flash-success {
    background: var(--color-success);
    color: white;
}

.flash-warning {
    background: var(--color-warning);
    color: white;
}


.blog-description {
    max-width: 55ch;
}

.blog-description a,
.blog-description a:visited {
    color: var(--color-link);
}

.blog-header {
    margin-bottom: 6rem;
}

.posts {
    border-top: 1px solid #ddd;
    padding-top: 3rem;
}

.post-item {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
    text-decoration: none;
    color: inherit;
}

.post-date {
    font-family: monospace;
    font-size: 0.9rem;
    color: var(--color-secondary);
}

.post-title {
    font-size: 1.1rem;
    line-height: 1.3;
}

.post-item:hover .post-title {
    color: var(--color-secondary);
}

.blog-link {
    font-family: monospace;
    color: var(--color-secondary);
    text-decoration: none;
    font-size: 0.9rem;
}

.blog-link:hover {
    color: var(--color-text);
}

/* Article */
article {
    margin-bottom: 4rem;
}

article .post-header {
    margin-bottom: 3rem;
}

article h1 {
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: normal;
    margin-bottom: 1rem;
}

article .post-date {
    font-family: monospace;
    color: var(--secondary-text);
}

/* Content Elements */
article .post-content>*+* {
    margin-top: 1.5rem;
}

article h2 {
    font-size: 1.5rem;
    font-weight: normal;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
}

article h3 {
    font-size: 1.2rem;
    font-weight: normal;
    margin-top: 2rem;
    margin-bottom: 1rem;
}

article p {
    max-width: 70ch;
    margin-block: 1lh;
}

article a {
    color: var(--color-link);
}

article ul,
ol {
    padding-left: 1.5rem;
    max-width: 65ch;
}

article li+li {
    margin-top: 0.5rem;
}

/* Code */
article pre {
    overflow-x: auto;
    border: 1px solid var(--color-border);
}

article code {
    font-family: monospace;
    font-size: 0.9rem;
}

article p code {
    padding: 0.2rem 0.4rem;
    background: var(--code-bg);
    border-radius: 0.25em;
}

article ul li {
    list-style: disc;
}

article ul li:has(input[type="checkbox"]) {
    list-style: none;
    position: relative;
}

article ul li input[type="checkbox"] {
    display: inline-block;
    width: auto;
}

article section.footnotes {
    border-top: 1px solid var(--color-border);
}

article section.footnotes h2.footnote-label {
    margin-top: 1em;
}

article section.footnotes ol li p {
    margin: 0;
}

/* Images */
article img {
    max-width: 100%;
    height: auto;
    margin: 2rem 0;
}

article figure {
    margin: 2rem 0;
}

article figcaption {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: var(--secondary-text);
    text-align: center;
}

/* Tables */
article table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: 0.9rem;
}

article th,
td {
    padding: 0.75rem;
    border: 1px solid var(--color-border);
    text-align: left;
}

article th {
    font-family: monospace;
    font-weight: normal;
    letter-spacing: 0.05em;
}



.post-status {
    font-family: monospace;
    font-size: 0.9rem;
    color: var(--secondary-text);
}

.buttons {
    display: flex;
    gap: 1rem;
}

.settings-section {
    margin-bottom: 4rem;
}

.settings-section h2 {
    font-family: monospace;
    font-size: 1rem;
    font-weight: normal;
    letter-spacing: 0.05em;
    margin-bottom: 1.5rem;
    color: var(--secondary-text);
}

.account-info {
    border: 1px solid var(--color-border);
    padding: 2rem;
    margin-bottom: 3rem;
}

.info-row {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 2rem;
    margin-bottom: 1.5rem;
    align-items: baseline;
}

.info-row:last-child {
    margin-bottom: 0;
}

.label-form {
    font-family: monospace;
    font-size: 0.9rem;
    color: var(--secondary-text);
}

.label {
    font-family: monospace;
    color: var(--text-secondary);
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
    background: var(--color-border);
    color: black;
}

.label.label-inline {
    margin-left: 0.35rem;
}

.value {
    font-size: 1rem;
}

.label.label-green {
    background: var(--color-success);
    color: white;
}

.label.label-red {
    background: var(--color-warning);
    color: white;
}

/* Blogs List */
.blogs-list {
    border-top: 1px solid var(--color-border);
}

.blog-item {
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--color-border);
}

.blog-title {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
}

.blog-url {
    font-family: monospace;
    font-size: 0.9rem;
    color: var(--secondary-text);
    text-decoration: none;
}

.blog-url:hover {
    color: var(--text-color);
}

/* Footer */
footer {
    margin-top: 6rem;
    padding-top: 2rem;
    border-top: 1px solid #ddd;
    font-size: 0.9rem;
}

footer a {
    color: inherit;
}

.links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    margin-top: 2rem;
}

.links a {
    color: var(--text-color);
    text-decoration: none;
    border-bottom: 1px solid var(--color-border);
}

.links a:hover {
    border-bottom-color: var(--text-color);
}

@media (max-width: 600px) {
    .container {
        padding: 2rem 1.5rem;
    }

    h1 {
        font-size: 2rem;
    }

    nav {
        margin-bottom: 4rem;
    }

    .post-item {
        grid-template-columns: 1fr;
        gap: 0.5rem;
        margin-bottom: 2.5rem;
    }

    .post-date {
        font-size: 0.85rem;
    }
}

/* EDITOR */

.editor-container {
    height: 100%;
    padding: .75rem;
    display: flex;
    flex-direction: column;
    max-width: 900px;
    margin: 0 auto;
}

.editor-container input[type="text"] {
    font-family: var(--font-monospace);
    font-size: .8rem;
}

.editor-container input[type="submit"],
.editor-container .button {
    padding: 0.5rem 1rem;
    font-size: .8rem;
    letter-spacing: 0;
}

/* Title Input */
.title-input {
    width: 100%;
}

.editor-container .title-input input {
    width: 100%;
    padding: 0.75rem 0;
    font-size: 1.75rem;
    font-family: inherit;
    border: none;
    background: transparent;
    color: var(--text-color);
}

.editor-container .title-input input:focus {
    outline: none;
}

.editor-container .title-input input::placeholder {
    color: var(--secondary-text);
}

/* Publishing Controls */
.publishing-controls {
    margin-top: .5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    align-items: stretch;
}

.publishing-controls .buttons {
    gap: .5rem;
}

.publishing-controls-details {
    margin-top: .5rem;
}


.CodeMirror {
    font-family: var(--font-monospace);
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    padding: 0.5em;
}

.cm-s-nord span.cm-comment {
    color: var(--color-text);
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    display: none;
    background-color: var(--color-bg);
    overflow-y: auto;
    border: 3px dashed var(--color-warning);
}

.close-button {
    position: fixed;
    top: 1em;
    right: 2em;
    z-index: 1001;
}


.preview-content {
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
}

/* UTILS */

.muted {
    opacity: 0.6;
}

.no-color {
    color: inherit;
    text-decoration: none;
}

.no-color:hover {
    text-decoration: underline;
}


/* HIGHLIGHT.JS */
@media (prefers-color-scheme: light) {
    pre code.hljs {
        display: block;
        overflow-x: auto;
        padding: 1em
    }

    code.hljs {
        padding: 3px 5px
    }

    /*!
        Theme: GitHub
        Description: Light theme as seen on github.com
        Author: github.com
        Maintainer: @Hirse
        Updated: 2021-05-15

        Outdated base version: https://github.com/primer/github-syntax-light
        Current colors taken from GitHub's CSS
      */
    .hljs {
        color: #24292e;
        background: #ffffff
    }

    .hljs-doctag,
    .hljs-keyword,
    .hljs-meta .hljs-keyword,
    .hljs-template-tag,
    .hljs-template-variable,
    .hljs-type,
    .hljs-variable.language_ {
        /* prettylights-syntax-keyword */
        color: #d73a49
    }

    .hljs-title,
    .hljs-title.class_,
    .hljs-title.class_.inherited__,
    .hljs-title.function_ {
        /* prettylights-syntax-entity */
        color: #6f42c1
    }

    .hljs-attr,
    .hljs-attribute,
    .hljs-literal,
    .hljs-meta,
    .hljs-number,
    .hljs-operator,
    .hljs-variable,
    .hljs-selector-attr,
    .hljs-selector-class,
    .hljs-selector-id {
        /* prettylights-syntax-constant */
        color: #005cc5
    }

    .hljs-regexp,
    .hljs-string,
    .hljs-meta .hljs-string {
        /* prettylights-syntax-string */
        color: #032f62
    }

    .hljs-built_in,
    .hljs-symbol {
        /* prettylights-syntax-variable */
        color: #e36209
    }

    .hljs-comment,
    .hljs-code,
    .hljs-formula {
        /* prettylights-syntax-comment */
        color: #6a737d
    }

    .hljs-name,
    .hljs-quote,
    .hljs-selector-tag,
    .hljs-selector-pseudo {
        /* prettylights-syntax-entity-tag */
        color: #22863a
    }

    .hljs-subst {
        /* prettylights-syntax-storage-modifier-import */
        color: #24292e
    }

    .hljs-section {
        /* prettylights-syntax-markup-heading */
        color: #005cc5;
        font-weight: bold
    }

    .hljs-bullet {
        /* prettylights-syntax-markup-list */
        color: #735c0f
    }

    .hljs-emphasis {
        /* prettylights-syntax-markup-italic */
        color: #24292e;
        font-style: italic
    }

    .hljs-strong {
        /* prettylights-syntax-markup-bold */
        color: #24292e;
        font-weight: bold
    }

    .hljs-addition {
        /* prettylights-syntax-markup-inserted */
        color: #22863a;
        background-color: #f0fff4
    }

    .hljs-deletion {
        /* prettylights-syntax-markup-deleted */
        color: #b31d28;
        background-color: #ffeef0
    }

    .hljs-char.escape_,
    .hljs-link,
    .hljs-params,
    .hljs-property,
    .hljs-punctuation,
    .hljs-tag {
        /* purposely ignored */

    }
}

@media (prefers-color-scheme: dark) {
    pre code.hljs {
        display: block;
        overflow-x: auto;
        padding: 1em
    }

    code.hljs {
        padding: 3px 5px
    }

    /*!
        Theme: GitHub Dark
        Description: Dark theme as seen on github.com
        Author: github.com
        Maintainer: @Hirse
        Updated: 2021-05-15

        Outdated base version: https://github.com/primer/github-syntax-dark
        Current colors taken from GitHub's CSS
      */
    .hljs {
        color: #c9d1d9;
        background: #0d1117
    }

    .hljs-doctag,
    .hljs-keyword,
    .hljs-meta .hljs-keyword,
    .hljs-template-tag,
    .hljs-template-variable,
    .hljs-type,
    .hljs-variable.language_ {
        /* prettylights-syntax-keyword */
        color: #ff7b72
    }

    .hljs-title,
    .hljs-title.class_,
    .hljs-title.class_.inherited__,
    .hljs-title.function_ {
        /* prettylights-syntax-entity */
        color: #d2a8ff
    }

    .hljs-attr,
    .hljs-attribute,
    .hljs-literal,
    .hljs-meta,
    .hljs-number,
    .hljs-operator,
    .hljs-variable,
    .hljs-selector-attr,
    .hljs-selector-class,
    .hljs-selector-id {
        /* prettylights-syntax-constant */
        color: #79c0ff
    }

    .hljs-regexp,
    .hljs-string,
    .hljs-meta .hljs-string {
        /* prettylights-syntax-string */
        color: #a5d6ff
    }

    .hljs-built_in,
    .hljs-symbol {
        /* prettylights-syntax-variable */
        color: #ffa657
    }

    .hljs-comment,
    .hljs-code,
    .hljs-formula {
        /* prettylights-syntax-comment */
        color: #8b949e
    }

    .hljs-name,
    .hljs-quote,
    .hljs-selector-tag,
    .hljs-selector-pseudo {
        /* prettylights-syntax-entity-tag */
        color: #7ee787
    }

    .hljs-subst {
        /* prettylights-syntax-storage-modifier-import */
        color: #c9d1d9
    }

    .hljs-section {
        /* prettylights-syntax-markup-heading */
        color: #1f6feb;
        font-weight: bold
    }

    .hljs-bullet {
        /* prettylights-syntax-markup-list */
        color: #f2cc60
    }

    .hljs-emphasis {
        /* prettylights-syntax-markup-italic */
        color: #c9d1d9;
        font-style: italic
    }

    .hljs-strong {
        /* prettylights-syntax-markup-bold */
        color: #c9d1d9;
        font-weight: bold
    }

    .hljs-addition {
        /* prettylights-syntax-markup-inserted */
        color: #aff5b4;
        background-color: #033a16
    }

    .hljs-deletion {
        /* prettylights-syntax-markup-deleted */
        color: #ffdcd7;
        background-color: #67060c
    }

    .hljs-char.escape_,
    .hljs-link,
    .hljs-params,
    .hljs-property,
    .hljs-punctuation,
    .hljs-tag {
        /* purposely ignored */

    }
}

/* ================================================================================================================== */

/* KATEX */

@font-face {
    font-family: 'KaTeX_AMS';
    src: url(https://assets.exotext.com/fonts/KaTeX_AMS-Regular.woff2) format('woff2'), url(https://assets.exotext.com/fonts/KaTeX_AMS-Regular.woff) format('woff'), url(https://assets.exotext.com/fonts/KaTeX_AMS-Regular.ttf) format('truetype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'KaTeX_Caligraphic';
    src: url(https://assets.exotext.com/fonts/KaTeX_Caligraphic-Bold.woff2) format('woff2'), url(https://assets.exotext.com/fonts/KaTeX_Caligraphic-Bold.woff) format('woff'), url(https://assets.exotext.com/fonts/KaTeX_Caligraphic-Bold.ttf) format('truetype');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'KaTeX_Caligraphic';
    src: url(https://assets.exotext.com/fonts/KaTeX_Caligraphic-Regular.woff2) format('woff2'), url(https://assets.exotext.com/fonts/KaTeX_Caligraphic-Regular.woff) format('woff'), url(https://assets.exotext.com/fonts/KaTeX_Caligraphic-Regular.ttf) format('truetype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'KaTeX_Fraktur';
    src: url(https://assets.exotext.com/fonts/KaTeX_Fraktur-Bold.woff2) format('woff2'), url(https://assets.exotext.com/fonts/KaTeX_Fraktur-Bold.woff) format('woff'), url(https://assets.exotext.com/fonts/KaTeX_Fraktur-Bold.ttf) format('truetype');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'KaTeX_Fraktur';
    src: url(https://assets.exotext.com/fonts/KaTeX_Fraktur-Regular.woff2) format('woff2'), url(https://assets.exotext.com/fonts/KaTeX_Fraktur-Regular.woff) format('woff'), url(https://assets.exotext.com/fonts/KaTeX_Fraktur-Regular.ttf) format('truetype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'KaTeX_Main';
    src: url(https://assets.exotext.com/fonts/KaTeX_Main-Bold.woff2) format('woff2'), url(https://assets.exotext.com/fonts/KaTeX_Main-Bold.woff) format('woff'), url(https://assets.exotext.com/fonts/KaTeX_Main-Bold.ttf) format('truetype');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'KaTeX_Main';
    src: url(https://assets.exotext.com/fonts/KaTeX_Main-BoldItalic.woff2) format('woff2'), url(https://assets.exotext.com/fonts/KaTeX_Main-BoldItalic.woff) format('woff'), url(https://assets.exotext.com/fonts/KaTeX_Main-BoldItalic.ttf) format('truetype');
    font-weight: bold;
    font-style: italic;
}

@font-face {
    font-family: 'KaTeX_Main';
    src: url(https://assets.exotext.com/fonts/KaTeX_Main-Italic.woff2) format('woff2'), url(https://assets.exotext.com/fonts/KaTeX_Main-Italic.woff) format('woff'), url(https://assets.exotext.com/fonts/KaTeX_Main-Italic.ttf) format('truetype');
    font-weight: normal;
    font-style: italic;
}

@font-face {
    font-family: 'KaTeX_Main';
    src: url(https://assets.exotext.com/fonts/KaTeX_Main-Regular.woff2) format('woff2'), url(https://assets.exotext.com/fonts/KaTeX_Main-Regular.woff) format('woff'), url(https://assets.exotext.com/fonts/KaTeX_Main-Regular.ttf) format('truetype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'KaTeX_Math';
    src: url(https://assets.exotext.com/fonts/KaTeX_Math-BoldItalic.woff2) format('woff2'), url(https://assets.exotext.com/fonts/KaTeX_Math-BoldItalic.woff) format('woff'), url(https://assets.exotext.com/fonts/KaTeX_Math-BoldItalic.ttf) format('truetype');
    font-weight: bold;
    font-style: italic;
}

@font-face {
    font-family: 'KaTeX_Math';
    src: url(https://assets.exotext.com/fonts/KaTeX_Math-Italic.woff2) format('woff2'), url(https://assets.exotext.com/fonts/KaTeX_Math-Italic.woff) format('woff'), url(https://assets.exotext.com/fonts/KaTeX_Math-Italic.ttf) format('truetype');
    font-weight: normal;
    font-style: italic;
}

@font-face {
    font-family: 'KaTeX_SansSerif';
    src: url(https://assets.exotext.com/fonts/KaTeX_SansSerif-Bold.woff2) format('woff2'), url(https://assets.exotext.com/fonts/KaTeX_SansSerif-Bold.woff) format('woff'), url(https://assets.exotext.com/fonts/KaTeX_SansSerif-Bold.ttf) format('truetype');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'KaTeX_SansSerif';
    src: url(https://assets.exotext.com/fonts/KaTeX_SansSerif-Italic.woff2) format('woff2'), url(https://assets.exotext.com/fonts/KaTeX_SansSerif-Italic.woff) format('woff'), url(https://assets.exotext.com/fonts/KaTeX_SansSerif-Italic.ttf) format('truetype');
    font-weight: normal;
    font-style: italic;
}

@font-face {
    font-family: 'KaTeX_SansSerif';
    src: url(https://assets.exotext.com/fonts/KaTeX_SansSerif-Regular.woff2) format('woff2'), url(https://assets.exotext.com/fonts/KaTeX_SansSerif-Regular.woff) format('woff'), url(https://assets.exotext.com/fonts/KaTeX_SansSerif-Regular.ttf) format('truetype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'KaTeX_Script';
    src: url(https://assets.exotext.com/fonts/KaTeX_Script-Regular.woff2) format('woff2'), url(https://assets.exotext.com/fonts/KaTeX_Script-Regular.woff) format('woff'), url(https://assets.exotext.com/fonts/KaTeX_Script-Regular.ttf) format('truetype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'KaTeX_Size1';
    src: url(https://assets.exotext.com/fonts/KaTeX_Size1-Regular.woff2) format('woff2'), url(https://assets.exotext.com/fonts/KaTeX_Size1-Regular.woff) format('woff'), url(https://assets.exotext.com/fonts/KaTeX_Size1-Regular.ttf) format('truetype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'KaTeX_Size2';
    src: url(https://assets.exotext.com/fonts/KaTeX_Size2-Regular.woff2) format('woff2'), url(https://assets.exotext.com/fonts/KaTeX_Size2-Regular.woff) format('woff'), url(https://assets.exotext.com/fonts/KaTeX_Size2-Regular.ttf) format('truetype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'KaTeX_Size3';
    src: url(https://assets.exotext.com/fonts/KaTeX_Size3-Regular.woff2) format('woff2'), url(https://assets.exotext.com/fonts/KaTeX_Size3-Regular.woff) format('woff'), url(https://assets.exotext.com/fonts/KaTeX_Size3-Regular.ttf) format('truetype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'KaTeX_Size4';
    src: url(https://assets.exotext.com/fonts/KaTeX_Size4-Regular.woff2) format('woff2'), url(https://assets.exotext.com/fonts/KaTeX_Size4-Regular.woff) format('woff'), url(https://assets.exotext.com/fonts/KaTeX_Size4-Regular.ttf) format('truetype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'KaTeX_Typewriter';
    src: url(https://assets.exotext.com/fonts/KaTeX_Typewriter-Regular.woff2) format('woff2'), url(https://assets.exotext.com/fonts/KaTeX_Typewriter-Regular.woff) format('woff'), url(https://assets.exotext.com/fonts/KaTeX_Typewriter-Regular.ttf) format('truetype');
    font-weight: normal;
    font-style: normal;
}

.katex {
    font: normal 1.21em KaTeX_Main, Times New Roman, serif;
    line-height: 1.2;
    text-indent: 0;
    text-rendering: auto;
}

.katex * {
    -ms-high-contrast-adjust: none !important;
}

.katex * {
    border-color: currentColor;
}

.katex .katex-version::after {
    content: "0.16.9";
}

.katex .katex-mathml {
    position: absolute;
    clip: rect(1px, 1px, 1px, 1px);
    padding: 0;
    border: 0;
    height: 1px;
    width: 1px;
    overflow: hidden;
}

.katex .katex-html {}

.katex .katex-html>.newline {
    display: block;
}

.katex .base {
    position: relative;
    display: inline-block;
    white-space: nowrap;
    width: -webkit-min-content;
    width: -moz-min-content;
    width: min-content;
}

.katex .strut {
    display: inline-block;
}

.katex .textbf {
    font-weight: bold;
}

.katex .textit {
    font-style: italic;
}

.katex .textrm {
    font-family: KaTeX_Main;
}

.katex .textsf {
    font-family: KaTeX_SansSerif;
}

.katex .texttt {
    font-family: KaTeX_Typewriter;
}

.katex .mathnormal {
    font-family: KaTeX_Math;
    font-style: italic;
}

.katex .mathit {
    font-family: KaTeX_Main;
    font-style: italic;
}

.katex .mathrm {
    font-style: normal;
}

.katex .mathbf {
    font-family: KaTeX_Main;
    font-weight: bold;
}

.katex .boldsymbol {
    font-family: KaTeX_Math;
    font-weight: bold;
    font-style: italic;
}

.katex .amsrm {
    font-family: KaTeX_AMS;
}

.katex .mathbb,
.katex .textbb {
    font-family: KaTeX_AMS;
}

.katex .mathcal {
    font-family: KaTeX_Caligraphic;
}

.katex .mathfrak,
.katex .textfrak {
    font-family: KaTeX_Fraktur;
}

.katex .mathboldfrak,
.katex .textboldfrak {
    font-family: KaTeX_Fraktur;
    font-weight: bold;
}

.katex .mathtt {
    font-family: KaTeX_Typewriter;
}

.katex .mathscr,
.katex .textscr {
    font-family: KaTeX_Script;
}

.katex .mathsf,
.katex .textsf {
    font-family: KaTeX_SansSerif;
}

.katex .mathboldsf,
.katex .textboldsf {
    font-family: KaTeX_SansSerif;
    font-weight: bold;
}

.katex .mathitsf,
.katex .textitsf {
    font-family: KaTeX_SansSerif;
    font-style: italic;
}

.katex .mainrm {
    font-family: KaTeX_Main;
    font-style: normal;
}

.katex .vlist-t {
    display: inline-table;
    table-layout: fixed;
    border-collapse: collapse;
}

.katex .vlist-r {
    display: table-row;
}

.katex .vlist {
    display: table-cell;
    vertical-align: bottom;
    position: relative;
}

.katex .vlist>span {
    display: block;
    height: 0;
    position: relative;
}

.katex .vlist>span>span {
    display: inline-block;
}

.katex .vlist>span>.pstrut {
    overflow: hidden;
    width: 0;
}

.katex .vlist-t2 {
    margin-right: -2px;
}

.katex .vlist-s {
    display: table-cell;
    vertical-align: bottom;
    font-size: 1px;
    width: 2px;
    min-width: 2px;
}

.katex .vbox {
    display: inline-flex;
    flex-direction: column;
    align-items: baseline;
}

.katex .hbox {
    display: inline-flex;
    flex-direction: row;
    width: 100%;
}

.katex .thinbox {
    display: inline-flex;
    flex-direction: row;
    width: 0;
    max-width: 0;
}

.katex .msupsub {
    text-align: left;
}

.katex .mfrac>span>span {
    text-align: center;
}

.katex .mfrac .frac-line {
    display: inline-block;
    width: 100%;
    border-bottom-style: solid;
}

.katex .mfrac .frac-line,
.katex .overline .overline-line,
.katex .underline .underline-line,
.katex .hline,
.katex .hdashline,
.katex .rule {
    min-height: 1px;
}

.katex .mspace {
    display: inline-block;
}

.katex .llap,
.katex .rlap,
.katex .clap {
    width: 0;
    position: relative;
}

.katex .llap>.inner,
.katex .rlap>.inner,
.katex .clap>.inner {
    position: absolute;
}

.katex .llap>.fix,
.katex .rlap>.fix,
.katex .clap>.fix {
    display: inline-block;
}

.katex .llap>.inner {
    right: 0;
}

.katex .rlap>.inner,
.katex .clap>.inner {
    left: 0;
}

.katex .clap>.inner>span {
    margin-left: -50%;
    margin-right: 50%;
}

.katex .rule {
    display: inline-block;
    border: solid 0;
    position: relative;
}

.katex .overline .overline-line,
.katex .underline .underline-line,
.katex .hline {
    display: inline-block;
    width: 100%;
    border-bottom-style: solid;
}

.katex .hdashline {
    display: inline-block;
    width: 100%;
    border-bottom-style: dashed;
}

.katex .sqrt>.root {
    margin-left: 0.27777778em;
    margin-right: -0.55555556em;
}

.katex .sizing.reset-size1.size1,
.katex .fontsize-ensurer.reset-size1.size1 {
    font-size: 1em;
}

.katex .sizing.reset-size1.size2,
.katex .fontsize-ensurer.reset-size1.size2 {
    font-size: 1.2em;
}

.katex .sizing.reset-size1.size3,
.katex .fontsize-ensurer.reset-size1.size3 {
    font-size: 1.4em;
}

.katex .sizing.reset-size1.size4,
.katex .fontsize-ensurer.reset-size1.size4 {
    font-size: 1.6em;
}

.katex .sizing.reset-size1.size5,
.katex .fontsize-ensurer.reset-size1.size5 {
    font-size: 1.8em;
}

.katex .sizing.reset-size1.size6,
.katex .fontsize-ensurer.reset-size1.size6 {
    font-size: 2em;
}

.katex .sizing.reset-size1.size7,
.katex .fontsize-ensurer.reset-size1.size7 {
    font-size: 2.4em;
}

.katex .sizing.reset-size1.size8,
.katex .fontsize-ensurer.reset-size1.size8 {
    font-size: 2.88em;
}

.katex .sizing.reset-size1.size9,
.katex .fontsize-ensurer.reset-size1.size9 {
    font-size: 3.456em;
}

.katex .sizing.reset-size1.size10,
.katex .fontsize-ensurer.reset-size1.size10 {
    font-size: 4.148em;
}

.katex .sizing.reset-size1.size11,
.katex .fontsize-ensurer.reset-size1.size11 {
    font-size: 4.976em;
}

.katex .sizing.reset-size2.size1,
.katex .fontsize-ensurer.reset-size2.size1 {
    font-size: 0.83333333em;
}

.katex .sizing.reset-size2.size2,
.katex .fontsize-ensurer.reset-size2.size2 {
    font-size: 1em;
}

.katex .sizing.reset-size2.size3,
.katex .fontsize-ensurer.reset-size2.size3 {
    font-size: 1.16666667em;
}

.katex .sizing.reset-size2.size4,
.katex .fontsize-ensurer.reset-size2.size4 {
    font-size: 1.33333333em;
}

.katex .sizing.reset-size2.size5,
.katex .fontsize-ensurer.reset-size2.size5 {
    font-size: 1.5em;
}

.katex .sizing.reset-size2.size6,
.katex .fontsize-ensurer.reset-size2.size6 {
    font-size: 1.66666667em;
}

.katex .sizing.reset-size2.size7,
.katex .fontsize-ensurer.reset-size2.size7 {
    font-size: 2em;
}

.katex .sizing.reset-size2.size8,
.katex .fontsize-ensurer.reset-size2.size8 {
    font-size: 2.4em;
}

.katex .sizing.reset-size2.size9,
.katex .fontsize-ensurer.reset-size2.size9 {
    font-size: 2.88em;
}

.katex .sizing.reset-size2.size10,
.katex .fontsize-ensurer.reset-size2.size10 {
    font-size: 3.45666667em;
}

.katex .sizing.reset-size2.size11,
.katex .fontsize-ensurer.reset-size2.size11 {
    font-size: 4.14666667em;
}

.katex .sizing.reset-size3.size1,
.katex .fontsize-ensurer.reset-size3.size1 {
    font-size: 0.71428571em;
}

.katex .sizing.reset-size3.size2,
.katex .fontsize-ensurer.reset-size3.size2 {
    font-size: 0.85714286em;
}

.katex .sizing.reset-size3.size3,
.katex .fontsize-ensurer.reset-size3.size3 {
    font-size: 1em;
}

.katex .sizing.reset-size3.size4,
.katex .fontsize-ensurer.reset-size3.size4 {
    font-size: 1.14285714em;
}

.katex .sizing.reset-size3.size5,
.katex .fontsize-ensurer.reset-size3.size5 {
    font-size: 1.28571429em;
}

.katex .sizing.reset-size3.size6,
.katex .fontsize-ensurer.reset-size3.size6 {
    font-size: 1.42857143em;
}

.katex .sizing.reset-size3.size7,
.katex .fontsize-ensurer.reset-size3.size7 {
    font-size: 1.71428571em;
}

.katex .sizing.reset-size3.size8,
.katex .fontsize-ensurer.reset-size3.size8 {
    font-size: 2.05714286em;
}

.katex .sizing.reset-size3.size9,
.katex .fontsize-ensurer.reset-size3.size9 {
    font-size: 2.46857143em;
}

.katex .sizing.reset-size3.size10,
.katex .fontsize-ensurer.reset-size3.size10 {
    font-size: 2.96285714em;
}

.katex .sizing.reset-size3.size11,
.katex .fontsize-ensurer.reset-size3.size11 {
    font-size: 3.55428571em;
}

.katex .sizing.reset-size4.size1,
.katex .fontsize-ensurer.reset-size4.size1 {
    font-size: 0.625em;
}

.katex .sizing.reset-size4.size2,
.katex .fontsize-ensurer.reset-size4.size2 {
    font-size: 0.75em;
}

.katex .sizing.reset-size4.size3,
.katex .fontsize-ensurer.reset-size4.size3 {
    font-size: 0.875em;
}

.katex .sizing.reset-size4.size4,
.katex .fontsize-ensurer.reset-size4.size4 {
    font-size: 1em;
}

.katex .sizing.reset-size4.size5,
.katex .fontsize-ensurer.reset-size4.size5 {
    font-size: 1.125em;
}

.katex .sizing.reset-size4.size6,
.katex .fontsize-ensurer.reset-size4.size6 {
    font-size: 1.25em;
}

.katex .sizing.reset-size4.size7,
.katex .fontsize-ensurer.reset-size4.size7 {
    font-size: 1.5em;
}

.katex .sizing.reset-size4.size8,
.katex .fontsize-ensurer.reset-size4.size8 {
    font-size: 1.8em;
}

.katex .sizing.reset-size4.size9,
.katex .fontsize-ensurer.reset-size4.size9 {
    font-size: 2.16em;
}

.katex .sizing.reset-size4.size10,
.katex .fontsize-ensurer.reset-size4.size10 {
    font-size: 2.5925em;
}

.katex .sizing.reset-size4.size11,
.katex .fontsize-ensurer.reset-size4.size11 {
    font-size: 3.11em;
}

.katex .sizing.reset-size5.size1,
.katex .fontsize-ensurer.reset-size5.size1 {
    font-size: 0.55555556em;
}

.katex .sizing.reset-size5.size2,
.katex .fontsize-ensurer.reset-size5.size2 {
    font-size: 0.66666667em;
}

.katex .sizing.reset-size5.size3,
.katex .fontsize-ensurer.reset-size5.size3 {
    font-size: 0.77777778em;
}

.katex .sizing.reset-size5.size4,
.katex .fontsize-ensurer.reset-size5.size4 {
    font-size: 0.88888889em;
}

.katex .sizing.reset-size5.size5,
.katex .fontsize-ensurer.reset-size5.size5 {
    font-size: 1em;
}

.katex .sizing.reset-size5.size6,
.katex .fontsize-ensurer.reset-size5.size6 {
    font-size: 1.11111111em;
}

.katex .sizing.reset-size5.size7,
.katex .fontsize-ensurer.reset-size5.size7 {
    font-size: 1.33333333em;
}

.katex .sizing.reset-size5.size8,
.katex .fontsize-ensurer.reset-size5.size8 {
    font-size: 1.6em;
}

.katex .sizing.reset-size5.size9,
.katex .fontsize-ensurer.reset-size5.size9 {
    font-size: 1.92em;
}

.katex .sizing.reset-size5.size10,
.katex .fontsize-ensurer.reset-size5.size10 {
    font-size: 2.30444444em;
}

.katex .sizing.reset-size5.size11,
.katex .fontsize-ensurer.reset-size5.size11 {
    font-size: 2.76444444em;
}

.katex .sizing.reset-size6.size1,
.katex .fontsize-ensurer.reset-size6.size1 {
    font-size: 0.5em;
}

.katex .sizing.reset-size6.size2,
.katex .fontsize-ensurer.reset-size6.size2 {
    font-size: 0.6em;
}

.katex .sizing.reset-size6.size3,
.katex .fontsize-ensurer.reset-size6.size3 {
    font-size: 0.7em;
}

.katex .sizing.reset-size6.size4,
.katex .fontsize-ensurer.reset-size6.size4 {
    font-size: 0.8em;
}

.katex .sizing.reset-size6.size5,
.katex .fontsize-ensurer.reset-size6.size5 {
    font-size: 0.9em;
}

.katex .sizing.reset-size6.size6,
.katex .fontsize-ensurer.reset-size6.size6 {
    font-size: 1em;
}

.katex .sizing.reset-size6.size7,
.katex .fontsize-ensurer.reset-size6.size7 {
    font-size: 1.2em;
}

.katex .sizing.reset-size6.size8,
.katex .fontsize-ensurer.reset-size6.size8 {
    font-size: 1.44em;
}

.katex .sizing.reset-size6.size9,
.katex .fontsize-ensurer.reset-size6.size9 {
    font-size: 1.728em;
}

.katex .sizing.reset-size6.size10,
.katex .fontsize-ensurer.reset-size6.size10 {
    font-size: 2.074em;
}

.katex .sizing.reset-size6.size11,
.katex .fontsize-ensurer.reset-size6.size11 {
    font-size: 2.488em;
}

.katex .sizing.reset-size7.size1,
.katex .fontsize-ensurer.reset-size7.size1 {
    font-size: 0.41666667em;
}

.katex .sizing.reset-size7.size2,
.katex .fontsize-ensurer.reset-size7.size2 {
    font-size: 0.5em;
}

.katex .sizing.reset-size7.size3,
.katex .fontsize-ensurer.reset-size7.size3 {
    font-size: 0.58333333em;
}

.katex .sizing.reset-size7.size4,
.katex .fontsize-ensurer.reset-size7.size4 {
    font-size: 0.66666667em;
}

.katex .sizing.reset-size7.size5,
.katex .fontsize-ensurer.reset-size7.size5 {
    font-size: 0.75em;
}

.katex .sizing.reset-size7.size6,
.katex .fontsize-ensurer.reset-size7.size6 {
    font-size: 0.83333333em;
}

.katex .sizing.reset-size7.size7,
.katex .fontsize-ensurer.reset-size7.size7 {
    font-size: 1em;
}

.katex .sizing.reset-size7.size8,
.katex .fontsize-ensurer.reset-size7.size8 {
    font-size: 1.2em;
}

.katex .sizing.reset-size7.size9,
.katex .fontsize-ensurer.reset-size7.size9 {
    font-size: 1.44em;
}

.katex .sizing.reset-size7.size10,
.katex .fontsize-ensurer.reset-size7.size10 {
    font-size: 1.72833333em;
}

.katex .sizing.reset-size7.size11,
.katex .fontsize-ensurer.reset-size7.size11 {
    font-size: 2.07333333em;
}

.katex .sizing.reset-size8.size1,
.katex .fontsize-ensurer.reset-size8.size1 {
    font-size: 0.34722222em;
}

.katex .sizing.reset-size8.size2,
.katex .fontsize-ensurer.reset-size8.size2 {
    font-size: 0.41666667em;
}

.katex .sizing.reset-size8.size3,
.katex .fontsize-ensurer.reset-size8.size3 {
    font-size: 0.48611111em;
}

.katex .sizing.reset-size8.size4,
.katex .fontsize-ensurer.reset-size8.size4 {
    font-size: 0.55555556em;
}

.katex .sizing.reset-size8.size5,
.katex .fontsize-ensurer.reset-size8.size5 {
    font-size: 0.625em;
}

.katex .sizing.reset-size8.size6,
.katex .fontsize-ensurer.reset-size8.size6 {
    font-size: 0.69444444em;
}

.katex .sizing.reset-size8.size7,
.katex .fontsize-ensurer.reset-size8.size7 {
    font-size: 0.83333333em;
}

.katex .sizing.reset-size8.size8,
.katex .fontsize-ensurer.reset-size8.size8 {
    font-size: 1em;
}

.katex .sizing.reset-size8.size9,
.katex .fontsize-ensurer.reset-size8.size9 {
    font-size: 1.2em;
}

.katex .sizing.reset-size8.size10,
.katex .fontsize-ensurer.reset-size8.size10 {
    font-size: 1.44027778em;
}

.katex .sizing.reset-size8.size11,
.katex .fontsize-ensurer.reset-size8.size11 {
    font-size: 1.72777778em;
}

.katex .sizing.reset-size9.size1,
.katex .fontsize-ensurer.reset-size9.size1 {
    font-size: 0.28935185em;
}

.katex .sizing.reset-size9.size2,
.katex .fontsize-ensurer.reset-size9.size2 {
    font-size: 0.34722222em;
}

.katex .sizing.reset-size9.size3,
.katex .fontsize-ensurer.reset-size9.size3 {
    font-size: 0.40509259em;
}

.katex .sizing.reset-size9.size4,
.katex .fontsize-ensurer.reset-size9.size4 {
    font-size: 0.46296296em;
}

.katex .sizing.reset-size9.size5,
.katex .fontsize-ensurer.reset-size9.size5 {
    font-size: 0.52083333em;
}

.katex .sizing.reset-size9.size6,
.katex .fontsize-ensurer.reset-size9.size6 {
    font-size: 0.5787037em;
}

.katex .sizing.reset-size9.size7,
.katex .fontsize-ensurer.reset-size9.size7 {
    font-size: 0.69444444em;
}

.katex .sizing.reset-size9.size8,
.katex .fontsize-ensurer.reset-size9.size8 {
    font-size: 0.83333333em;
}

.katex .sizing.reset-size9.size9,
.katex .fontsize-ensurer.reset-size9.size9 {
    font-size: 1em;
}

.katex .sizing.reset-size9.size10,
.katex .fontsize-ensurer.reset-size9.size10 {
    font-size: 1.20023148em;
}

.katex .sizing.reset-size9.size11,
.katex .fontsize-ensurer.reset-size9.size11 {
    font-size: 1.43981481em;
}

.katex .sizing.reset-size10.size1,
.katex .fontsize-ensurer.reset-size10.size1 {
    font-size: 0.24108004em;
}

.katex .sizing.reset-size10.size2,
.katex .fontsize-ensurer.reset-size10.size2 {
    font-size: 0.28929605em;
}

.katex .sizing.reset-size10.size3,
.katex .fontsize-ensurer.reset-size10.size3 {
    font-size: 0.33751205em;
}

.katex .sizing.reset-size10.size4,
.katex .fontsize-ensurer.reset-size10.size4 {
    font-size: 0.38572806em;
}

.katex .sizing.reset-size10.size5,
.katex .fontsize-ensurer.reset-size10.size5 {
    font-size: 0.43394407em;
}

.katex .sizing.reset-size10.size6,
.katex .fontsize-ensurer.reset-size10.size6 {
    font-size: 0.48216008em;
}

.katex .sizing.reset-size10.size7,
.katex .fontsize-ensurer.reset-size10.size7 {
    font-size: 0.57859209em;
}

.katex .sizing.reset-size10.size8,
.katex .fontsize-ensurer.reset-size10.size8 {
    font-size: 0.69431051em;
}

.katex .sizing.reset-size10.size9,
.katex .fontsize-ensurer.reset-size10.size9 {
    font-size: 0.83317261em;
}

.katex .sizing.reset-size10.size10,
.katex .fontsize-ensurer.reset-size10.size10 {
    font-size: 1em;
}

.katex .sizing.reset-size10.size11,
.katex .fontsize-ensurer.reset-size10.size11 {
    font-size: 1.19961427em;
}

.katex .sizing.reset-size11.size1,
.katex .fontsize-ensurer.reset-size11.size1 {
    font-size: 0.20096463em;
}

.katex .sizing.reset-size11.size2,
.katex .fontsize-ensurer.reset-size11.size2 {
    font-size: 0.24115756em;
}

.katex .sizing.reset-size11.size3,
.katex .fontsize-ensurer.reset-size11.size3 {
    font-size: 0.28135048em;
}

.katex .sizing.reset-size11.size4,
.katex .fontsize-ensurer.reset-size11.size4 {
    font-size: 0.32154341em;
}

.katex .sizing.reset-size11.size5,
.katex .fontsize-ensurer.reset-size11.size5 {
    font-size: 0.36173633em;
}

.katex .sizing.reset-size11.size6,
.katex .fontsize-ensurer.reset-size11.size6 {
    font-size: 0.40192926em;
}

.katex .sizing.reset-size11.size7,
.katex .fontsize-ensurer.reset-size11.size7 {
    font-size: 0.48231511em;
}

.katex .sizing.reset-size11.size8,
.katex .fontsize-ensurer.reset-size11.size8 {
    font-size: 0.57877814em;
}

.katex .sizing.reset-size11.size9,
.katex .fontsize-ensurer.reset-size11.size9 {
    font-size: 0.69453376em;
}

.katex .sizing.reset-size11.size10,
.katex .fontsize-ensurer.reset-size11.size10 {
    font-size: 0.83360129em;
}

.katex .sizing.reset-size11.size11,
.katex .fontsize-ensurer.reset-size11.size11 {
    font-size: 1em;
}

.katex .delimsizing.size1 {
    font-family: KaTeX_Size1;
}

.katex .delimsizing.size2 {
    font-family: KaTeX_Size2;
}

.katex .delimsizing.size3 {
    font-family: KaTeX_Size3;
}

.katex .delimsizing.size4 {
    font-family: KaTeX_Size4;
}

.katex .delimsizing.mult .delim-size1>span {
    font-family: KaTeX_Size1;
}

.katex .delimsizing.mult .delim-size4>span {
    font-family: KaTeX_Size4;
}

.katex .nulldelimiter {
    display: inline-block;
    width: 0.12em;
}

.katex .delimcenter {
    position: relative;
}

.katex .op-symbol {
    position: relative;
}

.katex .op-symbol.small-op {
    font-family: KaTeX_Size1;
}

.katex .op-symbol.large-op {
    font-family: KaTeX_Size2;
}

.katex .op-limits>.vlist-t {
    text-align: center;
}

.katex .accent>.vlist-t {
    text-align: center;
}

.katex .accent .accent-body {
    position: relative;
}

.katex .accent .accent-body:not(.accent-full) {
    width: 0;
}

.katex .overlay {
    display: block;
}

.katex .mtable .vertical-separator {
    display: inline-block;
    min-width: 1px;
}

.katex .mtable .arraycolsep {
    display: inline-block;
}

.katex .mtable .col-align-c>.vlist-t {
    text-align: center;
}

.katex .mtable .col-align-l>.vlist-t {
    text-align: left;
}

.katex .mtable .col-align-r>.vlist-t {
    text-align: right;
}

.katex .svg-align {
    text-align: left;
}

.katex svg {
    display: block;
    position: absolute;
    width: 100%;
    height: inherit;
    fill: currentColor;
    stroke: currentColor;
    fill-rule: nonzero;
    fill-opacity: 1;
    stroke-width: 1;
    stroke-linecap: butt;
    stroke-linejoin: miter;
    stroke-miterlimit: 4;
    stroke-dasharray: none;
    stroke-dashoffset: 0;
    stroke-opacity: 1;
}

.katex svg path {
    stroke: none;
}

.katex img {
    border-style: none;
    min-width: 0;
    min-height: 0;
    max-width: none;
    max-height: none;
}

.katex .stretchy {
    width: 100%;
    display: block;
    position: relative;
    overflow: hidden;
}

.katex .stretchy::before,
.katex .stretchy::after {
    content: "";
}

.katex .hide-tail {
    width: 100%;
    position: relative;
    overflow: hidden;
}

.katex .halfarrow-left {
    position: absolute;
    left: 0;
    width: 50.2%;
    overflow: hidden;
}

.katex .halfarrow-right {
    position: absolute;
    right: 0;
    width: 50.2%;
    overflow: hidden;
}

.katex .brace-left {
    position: absolute;
    left: 0;
    width: 25.1%;
    overflow: hidden;
}

.katex .brace-center {
    position: absolute;
    left: 25%;
    width: 50%;
    overflow: hidden;
}

.katex .brace-right {
    position: absolute;
    right: 0;
    width: 25.1%;
    overflow: hidden;
}

.katex .x-arrow-pad {
    padding: 0 0.5em;
}

.katex .cd-arrow-pad {
    padding: 0 0.55556em 0 0.27778em;
}

.katex .x-arrow,
.katex .mover,
.katex .munder {
    text-align: center;
}

.katex .boxpad {
    padding: 0 0.3em;
}

.katex .fbox,
.katex .fcolorbox {
    box-sizing: border-box;
    border: 0.04em solid;
}

.katex .cancel-pad {
    padding: 0 0.2em;
}

.katex .cancel-lap {
    margin-left: -0.2em;
    margin-right: -0.2em;
}

.katex .sout {
    border-bottom-style: solid;
    border-bottom-width: 0.08em;
}

.katex .angl {
    box-sizing: border-box;
    border-top: 0.049em solid;
    border-right: 0.049em solid;
    margin-right: 0.03889em;
}

.katex .anglpad {
    padding: 0 0.03889em;
}

.katex .eqn-num::before {
    counter-increment: katexEqnNo;
    content: "(" counter(katexEqnNo) ")";
}

.katex .mml-eqn-num::before {
    counter-increment: mmlEqnNo;
    content: "(" counter(mmlEqnNo) ")";
}

.katex .mtr-glue {
    width: 50%;
}

.katex .cd-vert-arrow {
    display: inline-block;
    position: relative;
}

.katex .cd-label-left {
    display: inline-block;
    position: absolute;
    right: calc(50% + 0.3em);
    text-align: left;
}

.katex .cd-label-right {
    display: inline-block;
    position: absolute;
    left: calc(50% + 0.3em);
    text-align: right;
}

.katex-display {
    display: block;
    margin: 1em 0;
    text-align: center;
}

.katex-display>.katex {
    display: block;
    text-align: center;
    white-space: nowrap;
}

.katex-display>.katex>.katex-html {
    display: block;
    position: relative;
}

.katex-display>.katex>.katex-html>.tag {
    position: absolute;
    right: 0;
}

.katex-display.leqno>.katex>.katex-html>.tag {
    left: 0;
    right: auto;
}

.katex-display.fleqn>.katex {
    text-align: left;
    padding-left: 2em;
}

.lds-ripple,
.lds-ripple div {
    box-sizing: border-box;
}

.lds-ripple {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
}

.lds-ripple div {
    position: absolute;
    border: 4px solid currentColor;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
}

@keyframes lds-ripple {
    0% {
        top: 36px;
        left: 36px;
        width: 8px;
        height: 8px;
        opacity: 0;
    }

    4.9% {
        top: 36px;
        left: 36px;
        width: 8px;
        height: 8px;
        opacity: 0;
    }

    5% {
        top: 36px;
        left: 36px;
        width: 8px;
        height: 8px;
        opacity: 1;
    }

    100% {
        top: 0;
        left: 0;
        width: 80px;
        height: 80px;
        opacity: 0;
    }
}
`); 