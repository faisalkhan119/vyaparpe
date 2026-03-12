const fs = require('fs');
const content = fs.readFileSync('src/data/products.ts', 'utf8');
const idMatches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const counts = {};
idMatches.forEach(id => {
    counts[id] = (counts[id] || 0) + 1;
});
const duplicates = Object.keys(counts).filter(id => counts[id] > 1);
if (duplicates.length > 0) {
    console.log('Duplicates found:', duplicates);
    duplicates.forEach(id => {
        const regex = new RegExp("id: '" + id + "'", 'g');
        const lines = [];
        let match;
        while ((match = regex.exec(content)) !== null) {
            const line = content.substring(0, match.index).split('\n').length;
            lines.push(line);
        }
        console.log(`- ${id} at lines ${lines.join(', ')}`);
    });
} else {
    console.log('No duplicates found.');
}
const categories = [...new Set([...content.matchAll(/category:\s*['"]([^'"]+)['"]/g)].map(m => m[1]))];
console.log('Categories overview:');
categories.forEach(cat => {
    const reg = new RegExp("category: '" + cat + "'", 'g');
    const matches = content.match(reg);
    console.log(`- ${cat}: ${matches ? matches.length : 0} products`);
});
