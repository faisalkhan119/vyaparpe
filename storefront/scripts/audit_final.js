const fs = require('fs');
const content = fs.readFileSync('src/data/products.ts', 'utf8');

// Match everything inside the products array
const arrayStartMarker = 'export const products: Product[] = [';
const startIndex = content.indexOf(arrayStartMarker) + arrayStartMarker.length;
const endIndex = content.lastIndexOf('];');
const arrayContent = content.substring(startIndex, endIndex);

// Split by blocks { ... }
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
            blocks.push(arrayContent.substring(startPos, i + 1));
            startPos = -1;
        }
    }
}

const idMatches = [];
const catCounts = {};
const idsSeenInScript = new Set();
const duplicates = [];

blocks.forEach(block => {
    const idMatch = block.match(/id:\s*['"]([^'"]+)['"]/);
    const catMatch = block.match(/category:\s*['"]([^'"]+)['"]/);
    
    if (idMatch) {
        const id = idMatch[1];
        idMatches.push(id);
        if (idsSeenInScript.has(id)) {
            duplicates.push(id);
        }
        idsSeenInScript.add(id);
    }
    
    if (catMatch) {
        const cat = catMatch[1];
        catCounts[cat] = (catCounts[cat] || 0) + 1;
    }
});

const allCats = ['Electronics', 'Fashion', 'Groceries', 'Home & Kitchen', 'Beauty', 'Sports', 'Books', 'Toys', 'Jewelry', 'Food', 'Digital', 'Services', 'Gifts', 'Automotive', 'Health', 'Baby & Kids', 'Pet Supplies', 'Stationery', 'Fitness', 'Travel', 'Furniture'];
const emptyCats = allCats.filter(c => !catCounts[c]);

const report = {
    totalProducts: idMatches.length,
    duplicates: duplicates.length > 0 ? [...new Set(duplicates)] : 'None',
    categoryCounts: catCounts,
    emptyCategories: emptyCats
};

console.log(JSON.stringify(report, null, 2));
