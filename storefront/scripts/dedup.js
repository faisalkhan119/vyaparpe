const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/products.ts');
let content = fs.readFileSync(filePath, 'utf8');

const startIndex = content.indexOf('export const products: Product[] = [');
const arrayStartIndex = content.indexOf('[', startIndex);
const endIndex = content.indexOf('];', arrayStartIndex) + 1;

const arrayString = content.substring(arrayStartIndex, endIndex);

let productsArray;
try {
  productsArray = (new Function('return ' + arrayString))();
} catch (e) {
  console.error("Parse failed", e);
  process.exit(1);
}

// Deduplicate based on 'id'
const uniqueMap = new Map();
productsArray.forEach(p => {
  if (!uniqueMap.has(p.id)) {
    uniqueMap.set(p.id, p);
  } else {
    console.log('Removed duplicate:', p.id);
  }
});

const uniqueArray = Array.from(uniqueMap.values());

function customStringify(obj) {
  return JSON.stringify(obj, null, 4).replace(/"([a-zA-Z0-9_]+)":/g, '$1:');
}

const newArrayString = customStringify(uniqueArray).replace(/\\"/g, '"');

const newContent = content.substring(0, arrayStartIndex) + newArrayString + content.substring(endIndex);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully completed deduplication on products.ts! Total unique:', uniqueArray.length);
