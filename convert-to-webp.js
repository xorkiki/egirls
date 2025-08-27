const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const fs = require('fs');
const path = require('path');

async function convertToWebP() {
  console.log('🚀 Starting WebP conversion of wine night photos...\n');

  try {
    // Get all wine night photos (excluding already processed ones)
    const wineNightDir = 'public/photos/wine-night';
    const wineNightFiles = fs.readdirSync(wineNightDir).filter(file => 
      (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) && 
      !file.startsWith('ultra_') && 
      !file.startsWith('ultra_compressed_') &&
      !file.startsWith('resized_')
    );

    console.log(`📁 Found ${wineNightFiles.length} wine night photos to convert to WebP...\n`);

    let totalOriginalSize = 0;
    let totalWebPSize = 0;
    let processedCount = 0;

    for (const file of wineNightFiles) {
      const originalPath = path.join(wineNightDir, file);
      const originalStats = fs.statSync(originalPath);
      const originalSize = originalStats.size;
      totalOriginalSize += originalSize;

      console.log(`🔄 Processing: ${file} (${formatBytes(originalSize)})`);

      try {
        // Convert to WebP with good quality
        const webpImages = await imagemin([originalPath], {
          destination: wineNightDir,
          plugins: [
            imageminWebp({
              quality: 75, // Good quality
              method: 6, // Best compression
              nearLossless: 60,
              smartSubsample: true
            })
          ]
        });

        if (webpImages.length > 0) {
          const webpPath = webpImages[0].destinationPath;
          const webpStats = fs.statSync(webpPath);
          const webpSize = webpStats.size;
          totalWebPSize += webpSize;

          const savings = originalSize - webpSize;
          const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

          console.log(`✅ ${file}: ${formatBytes(originalSize)} → ${formatBytes(webpSize)} (${savingsPercent}% smaller)`);

          // Rename the WebP file to have .webp extension
          const webpFileName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          const finalWebpPath = path.join(wineNightDir, webpFileName);
          
          // Move the WebP file to the final location
          fs.renameSync(webpPath, finalWebpPath);

          processedCount++;
        }
      } catch (error) {
        console.log(`❌ Failed to convert ${file}: ${error.message}`);
      }
    }

    const totalSavings = totalOriginalSize - totalWebPSize;
    const totalSavingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(1);

    console.log('\n🎉 WebP conversion complete!');
    console.log('─'.repeat(60));
    console.log(`📊 Results:`);
    console.log(`   • Photos converted: ${processedCount}/${wineNightFiles.length}`);
    console.log(`   • Total original size: ${formatBytes(totalOriginalSize)}`);
    console.log(`   • Total WebP size: ${formatBytes(totalWebPSize)}`);
    console.log(`   • Total savings: ${formatBytes(totalSavings)} (${totalSavingsPercent}% smaller)`);
    
    console.log('\n💡 Next steps:');
    console.log('1. Review the WebP images (they have .webp extension)');
    console.log('2. If you\'re happy with the quality, you can remove the original JPG files');
    console.log('3. Your wine night page should load MUCH faster now!');
    console.log('\n⚠️  Note: WebP format provides excellent compression while maintaining quality');

  } catch (error) {
    console.error('❌ Error during WebP conversion:', error);
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Run the WebP conversion
convertToWebP();
