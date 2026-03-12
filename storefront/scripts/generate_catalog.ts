import fs from 'fs';
import path from 'path';
import { products } from '../src/data/products';

let md = '# 🛍️ VyaparPe Product Catalog\n\n';
const categories = [...new Set(products.map(p => p.category))];
categories.sort().forEach(cat => {
    md += '## ' + (cat || 'Uncategorized') + '\n\n';
    const catProducts = products.filter(p => p.category === cat);
    catProducts.forEach(p => {
        md += `- **${p.title}** (${p.brand})\n  - ID: \`${p.id}\`\n  - Price: ₹${p.price} (Original: ₹${p.originalPrice || p.price})\n  - Rating: ${p.rating} ⭐ (${p.reviewsCount} reviews)\n\n`;
    });
});

const outputPath = 'C:\\\\Users\\\\Vinay pratap singh\\\\.gemini\\\\antigravity\\\\brain\\\\6ebeae70-7859-4c9f-8347-d16cb52cb060\\\\product_catalog.md';
fs.writeFileSync(outputPath, md);
console.log('Catalog generated successfully at ' + outputPath);
