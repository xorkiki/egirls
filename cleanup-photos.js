const fs = require('fs');
const path = require('path');

function cleanupWineNightPhotos() {
  console.log('🧹 Starting wine night photos cleanup...\n');

  try {
    const wineNightDir = 'public/photos/wine-night';
    
    // Get all existing photo files
    const existingFiles = fs.readdirSync(wineNightDir).filter(file => 
      file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')
    );

    console.log(`📁 Found ${existingFiles.length} existing photo files`);
    
    // Create a clean array with only existing photos
    const cleanPhotoArray = existingFiles.map(file => `/photos/wine-night/${file}`);

    // Create the cleaned array code
    const arrayCode = `// Wine Night Photos Array - Cleaned and Optimized
const wineNightPhotos = [
${cleanPhotoArray.map(photo => `  '${photo}'`).join(',\n')}
];`;

    console.log('\n📝 Cleaned photo array:');
    console.log('─'.repeat(60));
    console.log(arrayCode);
    console.log('─'.repeat(60));
    
    console.log('\n💡 Next steps:');
    console.log('1. Copy the cleaned array above');
    console.log('2. Replace the wineNightPhotos array in Terminal_new.js');
    console.log('3. This will ensure only existing photos are loaded');
    console.log(`4. Total photos to load: ${cleanPhotoArray.length}`);

    // Also show file sizes
    console.log('\n📊 File size summary:');
    let totalSize = 0;
    existingFiles.forEach(file => {
      const filePath = path.join(wineNightDir, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      totalSize += stats.size;
      console.log(`   ${file}: ${sizeKB} KB`);
    });
    
    const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
    console.log(`\n   Total size: ${totalSizeMB} MB`);
    console.log(`   Average per photo: ${(totalSize / existingFiles.length / 1024).toFixed(1)} KB`);

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  }
}

// Run the cleanup
cleanupWineNightPhotos();
