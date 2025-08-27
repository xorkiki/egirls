const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
const fs = require('fs');
const path = require('path');

// Ultra-aggressive configuration for maximum compression
const ultraConfig = {
  jpeg: {
    quality: 30, // Very aggressive compression
    progressive: true,
    mozjpeg: {
      quality: 30, // Very aggressive compression
      progressive: true,
      baseline: false,
      arithmetic: false,
      dcScanOpt: 1,
      trellis: true,
      trellisDC: true,
      quantTable: 3,
      huffman: true,
      smooth: 1
    }
  },
  png: {
    quality: [0.1, 0.3], // Very aggressive compression
    speed: 1, // Slowest but best compression
    strip: true,
    dithering: 0.1
  },
  webp: {
    quality: 30, // Very aggressive compression
    method: 6, // Best compression
    nearLossless: 30,
    smartSubsample: true
  }
};

async function ultraCompressWineNight() {
  console.log('🚀 Starting ULTRA-COMPRESSION of wine night photos...\n');

  try {
    // Create ultra-compressed directory
    const ultraDir = 'public/photos/wine-night/ultra-compressed';
    if (!fs.existsSync(ultraDir)) {
      fs.mkdirSync(ultraDir, { recursive: true });
    }

    // Get all wine night photos
    const wineNightDir = 'public/photos/wine-night';
    const wineNightFiles = fs.readdirSync(wineNightDir).filter(file => 
      file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')
    );

    console.log(`📁 Found ${wineNightFiles.length} wine night photos to ultra-compress...\n`);

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
        // Ultra-compress with aggressive settings
        const compressedImages = await imagemin([originalPath], {
          destination: ultraDir,
          plugins: [
            imageminMozjpeg(ultraConfig.jpeg.mozjpeg),
            imageminPngquant(ultraConfig.png),
            imageminWebp(ultraConfig.webp)
          ]
        });

        if (compressedImages.length > 0) {
          const compressedPath = compressedImages[0].destinationPath;
          const compressedStats = fs.statSync(compressedPath);
          const compressedSize = compressedStats.size;
          totalCompressedSize += compressedSize;

          const savings = originalSize - compressedSize;
          const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

          console.log(`✅ ${file}: ${formatBytes(originalSize)} → ${formatBytes(compressedSize)} (${savingsPercent}% smaller)`);

          // Create ultra-compressed version in original location
          const ultraCompressedPath = path.join(wineNightDir, `ultra_compressed_${file}`);
          fs.copyFileSync(compressedPath, ultraCompressedPath);

          processedCount++;
        }
      } catch (error) {
        console.log(`❌ Failed to compress ${file}: ${error.message}`);
      }
    }

    // Clean up temporary directory
    if (fs.existsSync(ultraDir)) {
      fs.rmSync(ultraDir, { recursive: true, force: true });
    }

    const totalSavings = totalOriginalSize - totalCompressedSize;
    const totalSavingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(1);

    console.log('\n🎉 ULTRA-COMPRESSION complete!');
    console.log('─'.repeat(60));
    console.log(`📊 Results:`);
    console.log(`   • Photos processed: ${processedCount}/${wineNightFiles.length}`);
    console.log(`   • Total original size: ${formatBytes(totalOriginalSize)}`);
    console.log(`   • Total compressed size: ${formatBytes(totalCompressedSize)}`);
    console.log(`   • Total savings: ${formatBytes(totalSavings)} (${totalSavingsPercent}% smaller)`);
    
    console.log('\n💡 Next steps:');
    console.log('1. Review the ultra-compressed images (they have "ultra_compressed_" prefix)');
    console.log('2. If you\'re happy with the quality, replace the current versions');
    console.log('3. Your wine night page should load EXTREMELY fast now!');
    console.log('\n⚠️  Note: These images will have lower quality but much smaller file sizes');

  } catch (error) {
    console.error('❌ Error during ultra-compression:', error);
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Run the ultra-compression
ultraCompressWineNight();
