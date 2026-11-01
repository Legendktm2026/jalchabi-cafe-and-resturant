/**
 * Phase 8 — Hero Image WebP converter script
 * Converts public/images/jalchabi-exterior-dusk.jpg to .webp
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const srcJpg = path.resolve(__dirname, '../public/images/jalchabi-exterior-dusk.jpg');
const outWebp = path.resolve(__dirname, '../public/images/jalchabi-exterior-dusk.webp');

if (!fs.existsSync(srcJpg)) {
  console.error('Source JPG not found at:', srcJpg);
  process.exit(1);
}

try {
  execSync(`cwebp -q 82 "${srcJpg}" -o "${outWebp}"`, { stdio: 'inherit' });
  console.log('Successfully generated WebP hero image at:', outWebp);
} catch (err) {
  console.error('Failed to run cwebp:', err);
  process.exit(1);
}
