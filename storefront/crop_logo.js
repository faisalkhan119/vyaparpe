const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function cropLogo() {
  const inputPath = path.join(__dirname, 'public', 'vyapaarpe_logo.jpg');
  const outputPath = path.join(__dirname, 'public', 'vyapaarpe_logo_cropped.jpg');
  const finalPath = path.join(__dirname, 'public', 'vyapaarpe_logo.jpg');

  if (!fs.existsSync(inputPath)) {
    console.error('Logo file not found at:', inputPath);
    return;
  }

  try {
    // We use .trim() which automatically trims pixels of similar color from the edges.
    // By default, it looks at the top-left pixel to find the background color.
    await sharp(inputPath)
      .trim()
      .toFile(outputPath);
    
    console.log('Logo cropped successfully.');
    
    // Replace original image
    fs.copyFileSync(outputPath, finalPath);
    fs.unlinkSync(outputPath);
    console.log('Original logo replaced with cropped version.');
  } catch (error) {
    console.error('Error cropping logo:', error);
  }
}

cropLogo();
