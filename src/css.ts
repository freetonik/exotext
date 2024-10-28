import { raw } from 'hono/html';

export const renderedCSS = raw(`
        :root {
            --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
                sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            --font-monospace: ui-monospace, "SFMono-Regular", "SF Mono", Menlo, Consolas,
                "Liberation Mono", monospace;

            --color-text: #000;
            --color-link: rgb(0, 0, 238);
            --color-green: #05620f;
            --color-red: #620529;

            --color-gray: #555;
            --color-bg: hsla(50, 25%, 96%);
            --color-highlight: #ebebe8;

            --padding: 1.25em;
        }

        html {
            box-sizing: border-box;
        }

        *, *:before, *:after {
            box-sizing: inherit;
        }

        body {
            color: var(--color-text);
            background: var(--color-bg);
            font-family: var(--font-sans);
            font-size: 16px;
            font-weight: normal;
            margin: auto;
            padding: 1em;
            max-width: 900px;
            line-height: 1.35;
            overflow-wrap: break-word;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        a, a:visited {
            color: var(--color-text);
        }

        article a {
            color: var(--color-link);
        }

        article a:visited {
            color: purple;
        }

        footer {
            border-top: 1px solid var(--color-text);
            margin-top: 2em;
            text-align: center;
        }

        header {
            margin-bottom: 2em;
            display: flex;
            flex-direction: column;
        }

        header a {
            text-decoration: none;
            color: var(--color-text);
            font-size: 1em;
        }

        header nav {
            display: flex;
            justify-content: space-between;
        }

        header nav .active, header nav a.chapter:hover {
            border-bottom: 1px solid var(--color-text);
        }


        nav.subsections {
            margin-bottom: 2em;
            border: 1px solid var(--color-text);
            padding: 0;
            display: flex;
            align-items: stretch;
        }

        nav.subsections a {
            padding: 0.25em 0.5em;
            display: flex;
            align-items: center;
            border-right: 1px solid var(--color-text);
            transition: background-color 0.3s ease;
        }

        nav.subsections a:hover,
        nav.subsections a.active {
            background-color: var(--color-highlight);
        }

        nav.subsections a:first-child {
            border-left: none;
        }

        img,
        video,
        iframe {
            max-width: 100%;
            height: auto;
        }

        pre {
            padding: 0.75em;
        }

        code,
        pre {
            overflow: auto;
            text-wrap: scroll;
            background-color: var(--color-highlight);
        }

        p.code {
            padding: .2em .4em;
        }

        iframe,
        embed {
            max-width: 100%;
            height: auto;
            max-height: 30em;
        }

        figure {
            margin: 0;
            overflow: scroll;
        }

        blockquote {
            border-left: 2px solid #bf0000;
            padding-left: 1em;
            margin-left: 1em;
            font-style: italic;
        }

        /* ITEMS */

        .item-tiny {
            margin-bottom: 1.5em;
        }

        .item-short {
            margin-bottom: 2.5em;
        }

        .item-short p.item-summary {
            margin-top: 0.5em;
        }

        .item-actions {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        .lists-section {
            background-color: var(--color-highlight);
            
            margin: 1.5em 0;
            box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.1);
        }


        /* BUTTONS */

        .button,
        a.button:visited {
            appearance: none;
            text-decoration: none;
            background-color: #FAFBFC;
            border: 1px solid var(--color-text);
            box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
            box-sizing: border-box;
            color: #24292E;
            box-sizing: border-box;
            color: #24292e;
            cursor: pointer;
            display: inline-block;
            font-family: var(--font-sans);
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            list-style: none;
            padding: 6px 16px;
            position: relative;
            transition: background-color 0.15s cubic-bezier(0.3, 0, 0.5, 1);
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
            vertical-align: middle;
            white-space: nowrap;
            word-wrap: break-word;
        }

        .button:hover {
            background-color: hsl(0, 0%, 86%);
            text-decoration: none;
            transition-duration: 0.1s;
        }

        .button:disabled {
            color: #959da5;
            border-color: #959da5;
            pointer-events: none;
        }

        .button:disabled:hover {
            background-color: #FAFBFC;
        }

        .button:active {
            background-color: #edeff2;
            box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
            transition: none 0s;
        }

        .button:focus {
            outline: 1px transparent;
        }

        .button.subscribed {
            background-color: var(--color-green);
            color: white;
            box-shadow: none;
            min-width: 9em;
        }

        .button.subscribe {
            min-width: 9em;
        }

        .button.subscribe .unsubscribe-text,
        button.subscribed .unsubscribe-text {
            display: none;
        }

        .button.subscribed:hover .subscribed-text {
            display: none;
        }

        .button.subscribed:hover .unsubscribe-text {
            display: inline;
        }

        .button.subscribed:hover {
            background-color: var(--color-red);
        }

        /* FORMS */

        input[type="text"],
        input[type="password"],
        input[type="email"],
        input[type="url"],
        textarea {
            font-size: 1.25em;
            line-height: 28px;
            padding: 8px 16px;
            font-family: var(--font-sans);
            width: 100%;
            min-height: 1em;
            border: unset;
            outline-color: rgb(84 105 212 / 0.5);
            background-color: --var(color-bg);
            box-shadow:
                rgba(0, 0, 0, 0) 0px 0px 0px 0px,
                rgba(0, 0, 0, 0) 0px 0px 0px 0px,
                rgba(0, 0, 0, 0) 0px 0px 0px 0px,
                rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
                rgba(0, 0, 0, 0) 0px 0px 0px 0px,
                rgba(0, 0, 0, 0) 0px 0px 0px 0px,
                rgba(0, 0, 0, 0) 0px 0px 0px 0px;
        }

        .search-input {
            padding: 0.25em 0.5em !important;
            width: 100%;
            font-size: inherit !important;
            min-height: 0 !important;
            background-color: var(--color-highlight);
            transition: background-color 0.75s ease;
        }

        .search-input:focus {
            background-color: white;
            transition: background-color 0.4s ease;
            outline: none;
        }

        textarea::placeholder {
            font-family: var(--font-sans);

        }

        label,
        label {
            font-size: 14px;
            font-weight: 600;
            display: block;
            margin-bottom: 0.5em;
        }

        textarea.contentful {
            font-family: inherit;
            resize: vertical;
            line-height: inherit;
        }

        /* UTILS */

        .bold {
            font-weight: bold;
        }

        a.no-underline {
            border-bottom: none;
            text-decoration: none;
        }

        a.no-color {
            color: var(--color-text) !important;
        }

        .muted,
        .muted a {
            color: var(--color-gray) !important;
        }

        .blog-summary {
            border: 1px solid var(--color-text);
            padding: 0 1.25em 1em;
            margin-bottom: 3em;
        }


        .related-items {
            border: 1px solid var(--color-text);    
            margin: 2em 0;
        }

        .related-items h4 {
            border-bottom: 1px solid var(--color-text);
            padding: 1em 1.25em;
            background-color: var(--color-highlight);
        }

        .related-items div.items {
            padding: 1.5em 1.25em 0.5em;
        }

        .related-items h4 {
            margin: 0;
        }

        .related-items .item-short:last-child {
            margin-bottom: 0;
        }

        .flash {
            margin-bottom: 2em;
            border: 1px solid var(--color-text);
            padding: 1.25em;
            background-color: antiquewhite;
            border-bottom: 2px solid var(--color-text);
        }

        .flash-red {
            background-color: lightcoral;
        }

        .borderbox {
            border: 1px solid var(--color-text);
            padding: 1.25em;
        }

        .search-result mark {
            background-color: inherit;
            font-weight: bold;
        }

        .search-result span.label {
            font-weight: bold;
            margin-right: 0.1em;
            color: var(--color-bg);
            background-color: var(--color-gray);
            padding: 0.125em 0.4em;
            border-radius: 0.25em;
            text-transform: uppercase;
            font-size: 0.725em;
        }

        /* ADMIN CONTROLS */
        .admin-control#hidden {
            display: none;
        }

        .admin-control#hidden:target {
            display: block;
        }

        @media (max-width: 550px) {
            header .logo {
                display: block;
                margin-bottom: 0.65em;
            }
            nav.subsections {
                display: inline-flex;
            }
            nav.subsections a:last-child {
                border-right: none;
            }
        }
`);
