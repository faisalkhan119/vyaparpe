const fs = require('fs');
const path = require('path');
const util = require('util');

const filePath = path.resolve(__dirname, '../src/data/products.ts');
let content = fs.readFileSync(filePath, 'utf8');

const startIndex = content.indexOf('export const products: Product[] = [');
const arrayStartIndex = content.indexOf('[', startIndex);
const endIndex = content.indexOf('];', arrayStartIndex) + 1;

let arrayString = content.substring(arrayStartIndex, endIndex);

let productsArray;
try {
  productsArray = (new Function('return ' + arrayString))();
} catch (e) {
  // Try fixing double quotes real quick if parsed from previous corrupt JSON
  const backup = arrayString.replace(/"([a-zA-Z0-9_]+)":/g, '$1:');
  productsArray = (new Function('return ' + backup))();
}

// Deduplicate
const uniqueMap = new Map();
productsArray.forEach(p => {
  if (!uniqueMap.has(p.id)) uniqueMap.set(p.id, p);
});
const uniqueArray = Array.from(uniqueMap.values());

// Use util.inspect which natively formats as pure JS object notation!
// We set depth null to ensure nested arrays/objects like variantGroups don't get [Object]
const cleanJsStr = util.inspect(uniqueArray, { depth: null, maxArrayLength: null, showHidden: false });

const newContent = content.substring(0, arrayStartIndex) + cleanJsStr + content.substring(endIndex);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Restored TS compilation compatibility precisely!');
