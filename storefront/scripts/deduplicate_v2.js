const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/products.ts');
const content = fs.readFileSync(filePath, 'utf8');

const arrayStart = content.indexOf('export const products: Product[] = [');
const arrayEnd = content.lastIndexOf('];');

if (arrayStart === -1 || arrayEnd === -1) {
    console.error("Could not find products array bound.");
    process.exit(1);
}

const beforeArray = content.substring(0, arrayStart + 'export const products: Product[] = ['.length);
const afterArray = content.substring(arrayEnd);
const arrayContent = content.substring(arrayStart + 'export const products: Product[] = ['.length, arrayEnd);

// Instead of parsing the whole array with Function (dangerous with large data), 
// let's split into individual object blocks.
// Assumption: Each product block starts with { and ends with }, (with id inside)

const blocks = [];
let braceCount = 0;
let startPos = -1;

for (let i = 0; i < arrayContent.length; i++) {
    if (arrayContent[i] === '{') {
        if (braceCount === 0) startPos = i;
        braceCount++;
    } else if (arrayContent[i] === '}') {
        braceCount--;
        if (braceCount === 0 && startPos !== -1) {
            // Check if there is a comma after }
            let endPos = i + 1;
            while (endPos < arrayContent.length && (arrayContent[endPos] === ',' || /\s/.test(arrayContent[endPos]))) {
                endPos++;
            }
            blocks.push(arrayContent.substring(startPos, endPos).trim());
            startPos = -1;
        }
    }
}

console.log(`Total blocks found: ${blocks.length}`);

const uniqueBlocks = [];
const seenIds = new Set();

blocks.forEach(block => {
    const idMatch = block.match(/id:\s*['"]([^'"]+)['"]/);
    if (idMatch) {
        const id = idMatch[1];
        if (!seenIds.has(id)) {
            seenIds.add(id);
            uniqueBlocks.push(block);
        } else {
            console.log(`Dropping duplicate product ID: ${id}`);
        }
    }
});

const newArrayContent = '\n    ' + uniqueBlocks.join('\n    ') + '\n';
const newFileContent = beforeArray + newArrayContent + afterArray;

fs.writeFileSync(filePath, newFileContent, 'utf8');
console.log(`Successfully deduplicated! Total unique products: ${uniqueBlocks.length}`);
