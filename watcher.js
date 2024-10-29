const fs = require('node:fs');

const cssFilePath = './src/styles.css'; // Replace with your CSS file path
const tsOutputPath = './src/css.ts'; // Replace with your desired TypeScript output path

function convertCssToTs(cssContent) {
    return `// This file is auto-generated. Do not edit directly.
import { raw } from 'hono/html';
export const renderedCSS = raw(\`
${cssContent}
\`); `;
}

// Function to handle the file conversion
function handleCssChange() {
    try {
        const cssContent = fs.readFileSync(cssFilePath, 'utf8');
        const tsContent = convertCssToTs(cssContent);
        fs.writeFileSync(tsOutputPath, tsContent);
        console.log(`Successfully converted ${cssFilePath} to ${tsOutputPath}`);
    } catch (error) {
        console.error('Error processing CSS file:', error);
    }
}

// Set up the file watcher
console.log(`Watching ${cssFilePath} for changes...`);
fs.watch(cssFilePath, (eventType) => {
    if (eventType === 'change') {
        handleCssChange();
    }
});

// Initial conversion
handleCssChange();
