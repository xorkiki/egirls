const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
const fs = require('fs');
const path = require('path');

// Aggressive configuration for maximum compression
const aggressiveConfig = {
  jpeg: {
    quality: 60, // More aggressive compression (was 80)
    progressive: true,
    mozjpeg: {
      quality: 60, // More aggressive compression
      progressive: true,
      baseline: false,
      arithmetic: false,
      dcScanOpt: 1,
      trellis: true,
      trellisDC: true,
      quantTable: 3,
      huffman: true
    }
  },
  png: {
    quality: [0.4, 0.6], // More aggressive compression (was 0.6-0.8)
    speed: 1, // Slower but better compression
    strip: true,
    dithering: 0.5
  },
  webp: {
    quality: 60, // More aggressive compression (was 80)
    method: 6, // Best compression
    nearLossless: 60,
    smartSubsample: true
  }
};

async function aggressivelyOptimizeWineNight() {
  console.log('🚀 Starting AGGRESSIVE wine night photo optimization...\n');

  try {
    // Create optimized directory
    const optimizedDir = 'public/photos/wine-night/ultra-optimized';
    if (!fs.existsSync(optimizedDir)) {
      fs.mkdirSync(optimizedDir, { recursive: true });
    }

    // Get all wine night photos
    const wineNightDir = 'public/photos/wine-night';
    const wineNightFiles = fs.readdirSync(wineNightDir).filter(file => 
      file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')
    );

    console.log(`📁 Found ${wineNightFiles.length} wine night photos to optimize...\n`);

    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    let processedCount = 0;

    for (const file of wineNightFiles) {
      const originalPath = path.join(wineNightDir, file);
      const originalStats = fs.statSync(originalPath);
      const originalSize = originalStats.size;
      totalOriginalSize += originalSize;

      console.log(`🔄 Processing: ${file} (${formatBytes(originalSize)})`);

      try {
        // Optimize with aggressive settings
        const optimizedImages = await imagemin([originalPath], {
          destination: optimizedDir,
          plugins: [
            imageminMozjpeg(aggressiveConfig.jpeg.mozjpeg),
            imageminPngquant(aggressiveConfig.png),
            imageminWebp(aggressiveConfig.webp)
          ]
        });

        if (optimizedImages.length > 0) {
          const optimizedPath = optimizedImages[0].destinationPath;
          const optimizedStats = fs.statSync(optimizedPath);
          const optimizedSize = optimizedStats.size;
          totalOptimizedSize += optimizedSize;

          const savings = originalSize - optimizedSize;
          const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

          console.log(`✅ ${file}: ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${savingsPercent}% smaller)`);

          // Create ultra-optimized version in original location
          const ultraOptimizedPath = path.join(wineNightDir, `ultra_${file}`);
          fs.copyFileSync(optimizedPath, ultraOptimizedPath);

          processedCount++;
        }
      } catch (error) {
        console.log(`❌ Failed to optimize ${file}: ${error.message}`);
      }
    }

    // Clean up temporary directory
    if (fs.existsSync(optimizedDir)) {
      fs.rmSync(optimizedDir, { recursive: true, force: true });
    }

    const totalSavings = totalOriginalSize - totalOptimizedSize;
    const totalSavingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(1);

    console.log('\n🎉 AGGRESSIVE optimization complete!');
    console.log('─'.repeat(60));
    console.log(`📊 Results:`);
    console.log(`   • Photos processed: ${processedCount}/${wineNightFiles.length}`);
    console.log(`   • Total original size: ${formatBytes(totalOriginalSize)}`);
    console.log(`   • Total optimized size: ${formatBytes(totalOptimizedSize)}`);
    console.log(`   • Total savings: ${formatBytes(totalSavings)} (${totalSavingsPercent}% smaller)`);
    
    console.log('\n💡 Next steps:');
    console.log('1. Review the ultra-optimized images (they have "ultra_" prefix)');
    console.log('2. If you\'re happy with the quality, replace the current optimized versions');
    console.log('3. Your wine night page should load MUCH faster now!');

  } catch (error) {
    console.error('❌ Error during aggressive optimization:', error);
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Run the aggressive optimization
aggressivelyOptimizeWineNight();
