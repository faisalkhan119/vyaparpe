const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/data/products.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Try to extract the product array content
const productsMatch = content.match(/export const products: Product\[\] = \[([\s\S]*?)\];/);
if (!productsMatch) {
    console.error('Could not find products array');
    process.exit(1);
}

const productsArrayContent = productsMatch[1];

// Split by product blocks
// This is tricky because of nested braces, but we can try to split by '    {' at the start of a line
// and '    },' at the end of a line.
const blocks = [];
let currentBlock = '';
let braceDepth = 0;
const lines = productsArrayContent.split('\n');

for (const line of lines) {
    if (line.trim() === '{') {
        if (braceDepth === 0) {
            currentBlock = '{' + '\n';
        } else {
            currentBlock += line + '\n';
        }
        braceDepth++;
    } else if (line.trim() === '},' || line.trim() === '}') {
        braceDepth--;
        currentBlock += line + '\n';
        if (braceDepth === 0) {
            blocks.push(currentBlock);
            currentBlock = '';
        }
    } else if (braceDepth > 0) {
        currentBlock += line + '\n';
    }
}

console.log(`Found ${blocks.length} blocks`);

// De-duplicate by ID
const uniqueProducts = new Map();
blocks.forEach(block => {
    const idMatch = block.match(/id: '(.*?)'/);
    if (idMatch) {
        const id = idMatch[1];
        // If it's a duplicate, we prefer the one that doesn't look corrupted (no weird whitespace)
        if (!uniqueProducts.has(id) || (uniqueProducts.has(id) && block.length > uniqueProducts.get(id).length && !block.includes('       '))) {
            uniqueProducts.set(id, block);
        }
    }
});

console.log(`Unique products: ${uniqueProducts.size}`);

// Reconstruct the file
const header = content.split('export const products: Product[] =')[0] + 'export const products: Product[] = [\n';
const footer = '\n];' + content.split('];')[1];

let newContent = header;
uniqueProducts.forEach((block, id) => {
    // Clean up the block - remove extra newlines and fix the corrupted strings if we can
    // For now, let's just use it as is if it seems valid
    newContent += block.trim() + ',\n';
});
newContent = newContent.trim().replace(/,$/, '') + footer;

// Basic sanity check on syntax
try {
    // We can't easily eval TS, but we can check if braces match
    let openCount = (newContent.match(/\{/g) || []).length;
    let closeCount = (newContent.match(/\}/g) || []).length;
    console.log(`Braces: { ${openCount}, } ${closeCount}`);
} catch (e) {
    console.error('Sanity check failed');
}

fs.writeFileSync(filePath, newContent);
console.log('File rebuilt successfully');
