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
    --color-link: #333;
    --code-bg: #f5f5f5;
    --table-stripe: #f8f8f8;

}

@media (prefers-color-scheme: dark) {
    :root {
        --color-text: #e0e0e0;
        --color-secondary: #999;
        --color-bg: #313030;
        --color-success: #53be7e;
        --color-warning: #851d27;

        --button-secondary-bg: #252525;

        --color-border: #ddd;
        --color-link: #ccc;
        --code-bg: #252525;
        --table-stripe: #222;
    }

    .hljs {
        /* Override highlight.js theme for dark mode */
        background: var(--code-bg) !important;
        color: #e0e0e0 !important;
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

.flash {
    padding: 1rem;
    text-align: center;
    margin: 2rem 0;
    background: var(--color-border);
}

.flash a {
    color: inherit;
    font-weight: bold;
}

.flash-success {
    background: var(--color-success);
    color: var(--code-bg);
}

.flash-warning {
    background: var(--color-warning);
    color: var(--code-bg);
}


.blog-description {
    max-width: 55ch;
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
}

article a {
    color: var(--text-color);
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
    background: var(--code-bg);
    overflow-x: auto;
    border: 1px solid var(--color-border);
}

article code {
    font-family: monospace;
    font-size: 0.9rem;
}

article p code {
    background: var(--code-bg);
    padding: 0.2rem 0.4rem;
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

article tr:nth-child(even) {
    background: var(--table-stripe);
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
    color: var(--color-secondary);
}

.label.label-inline {
    margin-left: 0.35rem;
}

.value {
    font-size: 1rem;
}

.label.label-green {
    background: var(--color-success);
    color: var(--color-bg);
}

.label.label-red {
    background: var(--color-warning);
    color: var(--color-bg);
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

.publishing-controls .url-input-container {
    display: inline-flex;
    align-items: stretch;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: monospace;
    font-size: 14px;
    overflow: hidden;
    flex-grow: 1;
}

.publishing-controls .url-prefix {
    padding: 8px 0 8px 12px;
    background-color: transparent;
    color: #000;
    user-select: none;
}

.publishing-controls .url-suffix {
    padding: 0.5rem 0.5rem 0.5rem 0;
    border: none;
    outline: none;
    min-width: 200px;
    font-family: inherit;
    font-size: inherit;
}

/* Remove any background color change on focus */
.publishing-controls .url-suffix:focus {
    background-color: transparent;
}

.publishing-controls .url-input-container:focus-within {
    border-color: #2196f3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
}

.CodeMirror {
    font-family: var(--font-monospace);
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    padding: 0.5em;
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

/* HIGHLIGHT.JS */
pre code.hljs {
    display: block;
    overflow-x: auto;
    padding: 1em
}

code.hljs {
    padding: 3px 5px
}

/*!
    Theme: Default
    Description: Original highlight.js style
    Author: (c) Ivan Sagalaev <maniac@softwaremaniacs.org>
    Maintainer: @highlightjs/core-team
    Website: https://highlightjs.org/
    License: see project LICENSE
    Touched: 2021
  */

pre code.hljs {
    display: block;
    overflow-x: auto;
    padding: 1em
}

code.hljs {
    padding: 3px 5px
}

/* end baseline CSS */
.hljs {
    background: #F3F3F3;
    color: #444
}

/* Base color: saturation 0; */
.hljs-subst {
    /* default */

}

/* purposely ignored */
.hljs-formula,
.hljs-attr,
.hljs-property,
.hljs-params {}

.hljs-comment {
    color: #697070
}

.hljs-tag,
.hljs-punctuation {
    color: #444a
}

.hljs-tag .hljs-name,
.hljs-tag .hljs-attr {
    color: #444
}

.hljs-keyword,
.hljs-attribute,
.hljs-selector-tag,
.hljs-meta .hljs-keyword,
.hljs-doctag,
.hljs-name {
    font-weight: bold
}

/* User color: hue: 0 */
.hljs-type,
.hljs-string,
.hljs-number,
.hljs-selector-id,
.hljs-selector-class,
.hljs-quote,
.hljs-template-tag,
.hljs-deletion {
    color: #880000
}

.hljs-title,
.hljs-section {
    color: #880000;
    font-weight: bold
}

.hljs-regexp,
.hljs-symbol,
.hljs-variable,
.hljs-template-variable,
.hljs-link,
.hljs-selector-attr,
.hljs-operator,
.hljs-selector-pseudo {
    color: #ab5656
}

/* Language color: hue: 90; */
.hljs-literal {
    color: #695
}

.hljs-built_in,
.hljs-bullet,
.hljs-code,
.hljs-addition {
    color: #397300
}

/* Meta color: hue: 200 */
.hljs-meta {
    color: #1f7199
}

.hljs-meta .hljs-string {
    color: #38a
}

/* Misc effects */
.hljs-emphasis {
    font-style: italic
}

.hljs-strong {
    font-weight: bold
}
`); 