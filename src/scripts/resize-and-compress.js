const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function resizeAndCompressWineNight() {
  console.log('🚀 Starting RESIZE + COMPRESS of wine night photos...\n');

  try {
    // Get all wine night photos
    const wineNightDir = 'public/photos/wine-night';
    const wineNightFiles = fs.readdirSync(wineNightDir).filter(file => 
      file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') && !file.startsWith('ultra_') && !file.startsWith('ultra_compressed_')
    );

    console.log(`📁 Found ${wineNightFiles.length} wine night photos to resize and compress...\n`);

    let totalOriginalSize = 0;
    let totalCompressedSize = 0;
    let processedCount = 0;

    for (const file of wineNightFiles) {
      const originalPath = path.join(wineNightDir, file);
      const originalStats = fs.statSync(originalPath);
      const originalSize = originalStats.size;
      totalOriginalSize += originalSize;

      console.log(`🔄 Processing: ${file} (${formatBytes(originalSize)})`);

      try {
        // Resize and compress the image
        const outputPath = path.join(wineNightDir, `resized_${file}`);
        
        await sharp(originalPath)
          .resize(800, 600, { // Resize to 800x600 (much smaller than original)
            fit: 'inside',
            withoutEnlargement: true
          })
          .jpeg({ 
            quality: 60, // Aggressive compression
            progressive: true,
            mozjpeg: true
          })
          .toFile(outputPath);

        const compressedStats = fs.statSync(outputPath);
        const compressedSize = compressedStats.size;
        totalCompressedSize += compressedSize;

        const savings = originalSize - compressedSize;
        const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

        console.log(`✅ ${file}: ${formatBytes(originalSize)} → ${formatBytes(compressedSize)} (${savingsPercent}% smaller)`);

        processedCount++;
      } catch (error) {
        console.log(`❌ Failed to process ${file}: ${error.message}`);
      }
    }

    const totalSavings = totalOriginalSize - totalCompressedSize;
    const totalSavingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(1);

    console.log('\n🎉 RESIZE + COMPRESS complete!');
    console.log('─'.repeat(60));
    console.log(`📊 Results:`);
    console.log(`   • Photos processed: ${processedCount}/${wineNightFiles.length}`);
    console.log(`   • Total original size: ${formatBytes(totalOriginalSize)}`);
    console.log(`   • Total compressed size: ${formatBytes(totalCompressedSize)}`);
    console.log(`   • Total savings: ${formatBytes(totalSavings)} (${totalSavingsPercent}% smaller)`);
    
    console.log('\n💡 Next steps:');
    console.log('1. Review the resized images (they have "resized_" prefix)');
    console.log('2. If you\'re happy with the quality, replace the current versions');
    console.log('3. Your wine night page should load EXTREMELY fast now!');
    console.log('\n⚠️  Note: Images are resized to 800x600 for maximum performance');

  } catch (error) {
    console.error('❌ Error during resize and compress:', error);
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Run the resize and compress
resizeAndCompressWineNight();
