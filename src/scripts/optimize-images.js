const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
const fs = require('fs');
const path = require('path');

// Configuration for different image types
const config = {
  jpeg: {
    quality: 80, // High quality but compressed
    progressive: true,
    mozjpeg: {
      quality: 80,
      progressive: true
    }
  },
  png: {
    quality: [0.6, 0.8], // 60-80% quality range
    speed: 4 // Faster compression
  },
  webp: {
    quality: 80,
    method: 6 // Best compression
  }
};

async function optimizeImages() {
  console.log('🚀 Starting image optimization...\n');

  try {
    // Optimize brand images
    console.log('📁 Optimizing brand images...');
    const brandImages = await imagemin(['public/brand/*.{jpg,jpeg,png}'], {
      destination: 'public/brand/optimized',
      plugins: [
        imageminMozjpeg(config.jpeg.mozjpeg),
        imageminPngquant(config.png),
        imageminWebp(config.webp)
      ]
    });

    console.log(`✅ Brand images optimized: ${brandImages.length} files`);

    // Optimize wine night photos
    console.log('\n📁 Optimizing wine night photos...');
    const wineNightImages = await imagemin(['public/photos/wine-night/*.{jpg,jpeg,png}'], {
      destination: 'public/photos/wine-night/optimized',
      plugins: [
        imageminMozjpeg(config.jpeg.mozjpeg),
        imageminPngquant(config.png),
        imageminWebp(config.webp)
      ]
    });

    console.log(`✅ Wine night photos optimized: ${wineNightImages.length} files`);

    // Create optimized versions in original locations
    console.log('\n🔄 Creating optimized versions...');
    
    // Process brand images
    for (const image of brandImages) {
      const originalPath = image.sourcePath;
      const fileName = path.basename(originalPath);
      const optimizedPath = path.join('public/brand', `optimized_${fileName}`);
      
      // Copy optimized version to original location with "optimized_" prefix
      fs.copyFileSync(image.destinationPath, optimizedPath);
      console.log(`📸 ${fileName} → optimized_${fileName}`);
    }

    // Process wine night images
    for (const image of wineNightImages) {
      const originalPath = image.sourcePath;
      const fileName = path.basename(originalPath);
      const optimizedPath = path.join('public/photos/wine-night', `optimized_${fileName}`);
      
      // Copy optimized version to original location with "optimized_" prefix
      fs.copyFileSync(image.destinationPath, optimizedPath);
      console.log(`📸 ${fileName} → optimized_${fileName}`);
    }

    console.log('\n🎉 Image optimization complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Review the optimized images (they have "optimized_" prefix)');
    console.log('2. If you\'re happy with the quality, replace the originals');
    console.log('3. Update the image paths in your code if needed');
    console.log('\n💡 The optimized images should be significantly smaller while maintaining good quality!');

  } catch (error) {
    console.error('❌ Error during optimization:', error);
  }
}

// Run the optimization
optimizeImages();
