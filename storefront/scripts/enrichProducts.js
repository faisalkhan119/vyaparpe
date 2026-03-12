const fs = require('fs');
const path = require('path');

// Read the file from Current Working Directory (assuming run from storefront)
const filePath = path.join(process.cwd(), 'src', 'data', 'products.ts');
let content = fs.readFileSync(filePath, 'utf8');

const startIndex = content.indexOf('export const products: Product[] = [');
const arrayStartIndex = content.indexOf('[', startIndex);
const endIndex = content.indexOf('];', arrayStartIndex) + 1;

let arrayString = content.substring(arrayStartIndex, endIndex);

let productsArray;
try {
  productsArray = (new Function('return ' + arrayString))();
} catch (e) {
  console.error("Failed to parse array", e);
  process.exit(1);
}

// Modify the array
productsArray = productsArray.map(product => {
  if (!product.images || product.images.length === 0) {
    product.images = [product.image];
    // try to add a second image if available or just duplicate to test gallery
    product.images.push(product.image);
  }
  
  if (!product.highlights || product.highlights.length === 0) {
    product.highlights = [
      'Premium build quality and high performance',
      '100% Authentic and verified product',
      'Fast shipping and hassle-free returns'
    ];
  }
  
  if (!product.variantGroups || product.variantGroups.length === 0) {
      if (['Fashion', 'Beauty', 'Sports'].includes(product.category)) {
          product.variantGroups = [{
              id: 'color', name: 'Color', type: 'select',
              options: [
                  { id: 'standard', label: 'Standard Edition' },
                  { id: 'premium', label: 'Premium Edition' }
              ]
          }];
      } else if (['Electronics', 'Digital', 'Home & Kitchen'].includes(product.category)) {
          product.variantGroups = [{
              id: 'warranty', name: 'Warranty', type: 'button',
              options: [
                  { id: '1yr', label: '1 Year Warranty' },
                  { id: '2yr', label: '2 Years Extended' }
              ]
          }];
      } else {
          product.variantGroups = [{
              id: 'pack', name: 'Packaging', type: 'button',
              options: [
                  { id: 'single', label: 'Single Pack' },
                  { id: 'twin', label: 'Twin Pack' }
              ]
          }];
      }
  }

  return product;
});

// Stringify back. 
function customStringify(obj) {
  return JSON.stringify(obj, null, 4).replace(/"([a-zA-Z0-9_]+)":/g, '$1:');
}

const newArrayString = customStringify(productsArray)
  .replace(/\\"/g, '"'); // fixing any double escape quotes

// Replace in content
const newContent = content.substring(0, arrayStartIndex) + newArrayString + content.substring(endIndex);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully enriched all products in products.ts!');
