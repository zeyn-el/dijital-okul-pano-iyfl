const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imagesDir = './images';
const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.png'));

console.log('🖼️  Resimler optimize ediliyor...\n');

files.forEach(file => {
    const inputPath = path.join(imagesDir, file);
    const stats = fs.statSync(inputPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

    console.log(`📦 ${file} (${sizeMB} MB) optimize ediliyor...`);

    try {
        // Sharp ile optimize et
        execSync(`npx sharp-cli resize 1920 --input "${inputPath}" --output "${inputPath}" --format webp --quality 80`, {
            stdio: 'inherit'
        });

        const newStats = fs.statSync(inputPath);
        const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2);
        const saved = ((stats.size - newStats.size) / 1024 / 1024).toFixed(2);

        console.log(`✅ ${file} → ${newSizeMB} MB (${saved} MB tasarruf)\n`);
    } catch (error) {
        console.error(`❌ ${file} optimize edilemedi:`, error.message);
    }
});

console.log('🎉 Tüm resimler optimize edildi!');
