// Resimleri WebP'ye çevir
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = './images';
const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.png'));

files.forEach(async (file) => {
    const input = path.join(imagesDir, file);
    const output = path.join(imagesDir, file.replace('.png', '.webp'));

    await sharp(input)
        .resize(1920, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(output);

    console.log(`✅ ${file} → ${path.basename(output)}`);
});
