const fs = require('fs');
const content = fs.readFileSync('src/data/products.ts', 'utf8');
const categories = [
    'Electronics', 'Fashion', 'Groceries', 'Home & Kitchen', 'Beauty', 
    'Sports', 'Books', 'Toys', 'Jewelry', 'Food', 'Digital', 
    'Services', 'Gifts', 'Automotive', 'Health', 'Baby & Kids', 
    'Pet Supplies', 'Stationery', 'Fitness', 'Travel', 'Furniture'
];

console.log('--- Category Audit ---');
categories.forEach(cat => {
    const regex = new RegExp("category:\\s*'" + cat + "'", 'g');
    const matches = content.match(regex);
    const count = matches ? matches.length : 0;
    console.log(`${cat.padEnd(20)}: ${count}`);
});
