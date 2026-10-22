/**
 * Session 4 - Question 3: Image Optimization Script using 'sharp'
 * 
 * Objective:
 * Resizes an AI-generated food background image and converts it to WebP format,
 * ensuring the resulting file size is strictly under 200KB for rapid web loading.
 * 
 * Usage:
 *   node optimize.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputPath = path.join(__dirname, 'images', 'zomato-hero-bg-original.jpg');
const outputPath = path.join(__dirname, 'images', 'zomato-hero-bg-optimized.webp');

async function optimizeImage() {
  console.log('----------------------------------------------------');
  console.log('🚀 Starting WebP Image Optimization with Sharp');
  console.log('----------------------------------------------------');

  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Input file not found: ${inputPath}`);
    process.exit(1);
  }

  const originalStats = fs.statSync(inputPath);
  const originalSizeKB = (originalStats.size / 1024).toFixed(2);
  console.log(`📂 Original File: zomato-hero-bg-original.jpg`);
  console.log(`📏 Original Size: ${originalSizeKB} KB (${originalStats.size} bytes)`);

  // Optimize: Resize width to 1600px (retina friendly, maintains aspect ratio)
  // Encode to WebP with 80% quality and max compression effort (6)
  const startTime = Date.now();

  const info = await sharp(inputPath)
    .resize({
      width: 1600,
      withoutEnlargement: true,
      fit: 'inside'
    })
    .webp({
      quality: 80,
      effort: 6,
      smartSubsample: true
    })
    .toFile(outputPath);

  const durationMs = Date.now() - startTime;
  const optimizedSizeKB = (info.size / 1024).toFixed(2);
  const savedKB = (originalSizeKB - optimizedSizeKB).toFixed(2);
  const savingsPct = (((originalStats.size - info.size) / originalStats.size) * 100).toFixed(1);

  console.log('\n✅ Optimization Complete!');
  console.log(`⚡ Output File:   zomato-hero-bg-optimized.webp`);
  console.log(`📐 Dimensions:    ${info.width} × ${info.height} px`);
  console.log(`📦 Optimized Size: ${optimizedSizeKB} KB`);
  console.log(`🎯 Target (<200KB): ${info.size < 200 * 1024 ? 'PASSED (Strictly < 200KB) ✓' : 'FAILED ✗'}`);
  console.log(`📉 Space Saved:   ${savedKB} KB (${savingsPct}% reduction)`);
  console.log(`⏱️ Duration:      ${durationMs} ms`);
  console.log('----------------------------------------------------');
}

optimizeImage().catch(console.error);
