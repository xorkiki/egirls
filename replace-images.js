const fs = require('fs');
const path = require('path');

function backupAndReplace() {
  console.log('🔄 Starting image replacement process...\n');
  
  try {
    // Create backup directory
    const backupDir = 'public/images-backup';
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
      console.log('📁 Created backup directory');
    }
    
    // Process brand images
    console.log('🏷️  Processing brand images...');
    const brandDir = 'public/brand';
    const brandFiles = fs.readdirSync(brandDir).filter(file => 
      file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')
    );
    
    let brandReplaced = 0;
    brandFiles.forEach(file => {
      if (!file.startsWith('optimized_')) {
        const originalPath = path.join(brandDir, file);
        const optimizedPath = path.join(brandDir, `optimized_${file}`);
        const backupPath = path.join(backupDir, `brand_${file}`);
        
        if (fs.existsSync(optimizedPath)) {
          // Backup original
          fs.copyFileSync(originalPath, backupPath);
          
          // Replace with optimized version
          fs.copyFileSync(optimizedPath, originalPath);
          
          // Remove the optimized_ prefix file
          fs.unlinkSync(optimizedPath);
          
          console.log(`✅ ${file} replaced and backed up`);
          brandReplaced++;
        }
      }
    });
    
    // Process wine night photos
    console.log('\n🍷 Processing wine night photos...');
    const wineNightDir = 'public/photos/wine-night';
    const wineNightFiles = fs.readdirSync(wineNightDir).filter(file => 
      file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')
    );
    
    let wineNightReplaced = 0;
    wineNightFiles.forEach(file => {
      if (!file.startsWith('optimized_')) {
        const originalPath = path.join(wineNightDir, file);
        const optimizedPath = path.join(wineNightDir, `optimized_${file}`);
        const backupPath = path.join(backupDir, `wine-night_${file}`);
        
        if (fs.existsSync(optimizedPath)) {
          // Backup original
          fs.copyFileSync(originalPath, backupPath);
          
          // Replace with optimized version
          fs.copyFileSync(optimizedPath, originalPath);
          
          // Remove the optimized_ prefix file
          fs.unlinkSync(optimizedPath);
          
          console.log(`✅ ${file} replaced and backed up`);
          wineNightReplaced++;
        }
      }
    });
    
    // Clean up temporary directories
    console.log('\n🧹 Cleaning up temporary files...');
    if (fs.existsSync('public/brand/optimized')) {
      fs.rmSync('public/brand/optimized', { recursive: true, force: true });
    }
    if (fs.existsSync('public/photos/wine-night/optimized')) {
      fs.rmSync('public/photos/wine-night/optimized', { recursive: true, force: true });
    }
    
    console.log('\n🎉 Image replacement complete!');
    console.log(`📊 Summary:`);
    console.log(`   • Brand images replaced: ${brandReplaced}`);
    console.log(`   • Wine night photos replaced: ${wineNightReplaced}`);
    console.log(`   • Total images replaced: ${brandReplaced + wineNightReplaced}`);
    console.log(`   • Originals backed up to: ${backupDir}`);
    
    console.log('\n💡 Your website should now load dramatically faster!');
    console.log('🔒 Original images are safely backed up if you need them later.');
    
  } catch (error) {
    console.error('❌ Error during replacement:', error);
  }
}

// Run the replacement
backupAndReplace();
