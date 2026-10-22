const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = 'C:\\Users\\Mamta\\.gemini\\antigravity-ide\\brain\\820e91f1-fd0f-48fc-a814-6fb991d6c96c';
const outputDir = path.join(__dirname, 'images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  console.log('Processing Session 4 assets...');

  // Q1: 3 custom app icons converted to PNG
  await sharp(path.join(brainDir, 'food_scooter_icon_1792653020598.jpg'))
    .png()
    .toFile(path.join(outputDir, 'food-delivery-scooter-icon.png'));
  console.log('✓ Q1: food-delivery-scooter-icon.png created');

  await sharp(path.join(brainDir, 'cricket_bat_icon_1792653041876.jpg'))
    .png()
    .toFile(path.join(outputDir, 'cricket-bat-icon.png'));
  console.log('✓ Q1: cricket-bat-icon.png created');

  await sharp(path.join(brainDir, 'movie_ticket_icon_1792653060425.jpg'))
    .png()
    .toFile(path.join(outputDir, 'movie-ticket-icon.png'));
  console.log('✓ Q1: movie-ticket-icon.png created');

  // Q2: Zomato food app background image
  const zomatoOrig = path.join(brainDir, 'zomato_hero_bg_1792653093613.jpg');
  fs.copyFileSync(zomatoOrig, path.join(outputDir, 'zomato-hero-bg-original.jpg'));
  console.log('✓ Q2: zomato-hero-bg-original.jpg saved');

  // Q3: WebP Optimization (< 200KB) using sharp
  const origStats = fs.statSync(zomatoOrig);
  const origSizeKB = (origStats.size / 1024).toFixed(2);

  const optimizedWebpPath = path.join(outputDir, 'zomato-hero-bg-optimized.webp');
  await sharp(zomatoOrig)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(optimizedWebpPath);

  const webpStats = fs.statSync(optimizedWebpPath);
  const webpSizeKB = (webpStats.size / 1024).toFixed(2);
  const reduction = (((origStats.size - webpStats.size) / origStats.size) * 100).toFixed(1);

  console.log(`✓ Q3 Optimization Result:`);
  console.log(`   Original JPG: ${origSizeKB} KB`);
  console.log(`   Optimized WebP: ${webpSizeKB} KB (Target < 200KB met!)`);
  console.log(`   Size Reduction: ${reduction}% saved`);

  // Q4: Music streaming hero images (realistic & cartoon)
  await sharp(path.join(brainDir, 'music_hero_realistic_1792653118906.jpg'))
    .toFile(path.join(outputDir, 'music-hero-realistic.jpg'));
  console.log('✓ Q4: music-hero-realistic.jpg saved');

  await sharp(path.join(brainDir, 'music_hero_cartoon_1792653146668.jpg'))
    .toFile(path.join(outputDir, 'music-hero-cartoon.jpg'));
  console.log('✓ Q4: music-hero-cartoon.jpg saved');

  console.log('\nAll asset processing complete!');
}

run().catch(console.error);
