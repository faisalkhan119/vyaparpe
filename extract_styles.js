const fs = require('fs');

function extractInlineStyles(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');
    const styleMap = new Map();
    let styleCounter = 1;
    let cssText = '\n/* Extracted Inline Styles */\n';
    
    html = html.replace(/<([a-zA-Z0-9\-]+)([^>]*)>/g, (match, tag, attrs) => {
        // Find style="..."
        const styleMatch = attrs.match(/style=(['"])(.*?)\1/);
        if (!styleMatch) return match;
        
        let styleContent = styleMatch[2];
        if (!styleContent.trim()) return match; // empty style
        
        // Handle JS templates or react logic inside HTML? These are static HTML files so should be safe.
        
        let className;
        if (styleMap.has(styleContent)) {
            className = styleMap.get(styleContent);
        } else {
            className = 'ex-style-' + styleCounter++;
            styleMap.set(styleContent, className);
            cssText += `.${className} { ${styleContent} }\n`;
        }
        
        // Remove style attribute
        let newAttrs = attrs.replace(/style=(['"])(.*?)\1/, '');
        
        // Inject class
        const classMatch = newAttrs.match(/class=(['"])(.*?)\1/);
        if (classMatch) {
            newAttrs = newAttrs.replace(/class=(['"])(.*?)\1/, `class=$1$2 ${className}$1`);
        } else {
            newAttrs += ` class="${className}"`;
        }
        
        return `<${tag}${newAttrs}>`;
    });
    
    if (styleMap.size > 0) {
        // Inject cssText into </style>
        if (html.includes('</style>')) {
            html = html.replace('</style>', `${cssText}</style>`);
        } else {
            // If no style tag exists, put it in head
            html = html.replace('</head>', `<style>${cssText}</style></head>`);
        }
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Extracted ${styleMap.size} unique styles for ${filePath}`);
    } else {
        console.log(`No inline styles found for ${filePath}`);
    }
}

try {
    extractInlineStyles('./storefront/public/sdg_presentation.html');
    extractInlineStyles('./pitch_deck.html');
} catch (e) {
    console.error(e);
}
