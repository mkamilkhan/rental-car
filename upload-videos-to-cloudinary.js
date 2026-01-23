const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const videoFiles = [
  'client/public/assets/vehicles/IMG_1631.MOV',
  'client/public/assets/vehicles/IMG_21481.MOV',
  'client/public/assets/vehicles/IMG_28415.MOV',
  'client/public/assets/vehicles/IMG_36304.mp4',
  'client/public/assets/vehicles/IMG_36962.MOV',
  'client/public/assets/vehicles/IMG_37343.MOV',
];

async function uploadVideo(filePath) {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filePath, path.extname(filePath));
    
    cloudinary.uploader.upload(
      filePath,
      {
        resource_type: 'video',
        folder: 'rental-car/videos',
        public_id: fileName,
        chunk_size: 6000000, // 6MB chunks for large files
      },
      (error, result) => {
        if (error) {
          console.error(`❌ Error uploading ${fileName}:`, error.message);
          reject(error);
        } else {
          console.log(`✅ Uploaded: ${fileName}`);
          console.log(`   URL: ${result.secure_url}`);
          resolve({
            fileName,
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      }
    );
  });
}

async function uploadAllVideos() {
  console.log('🚀 Starting video upload to Cloudinary...\n');
  
  const results = [];
  
  for (const filePath of videoFiles) {
    if (fs.existsSync(filePath)) {
      try {
        const result = await uploadVideo(filePath);
        results.push({
          localPath: filePath,
          ...result,
        });
        // Wait a bit between uploads to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Failed to upload ${filePath}:`, error.message);
      }
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
    }
  }
  
  console.log('\n📋 Upload Summary:');
  console.log('==================');
  results.forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.fileName}`);
    console.log(`   Local: ${result.localPath}`);
    console.log(`   Cloudinary: ${result.url}`);
  });
  
  // Save results to file
  fs.writeFileSync(
    'cloudinary-video-urls.json',
    JSON.stringify(results, null, 2)
  );
  
  console.log('\n✅ All videos uploaded! URLs saved to cloudinary-video-urls.json');
  console.log('\n📝 Next steps:');
  console.log('1. Update code files with Cloudinary URLs');
  console.log('2. Remove videos from git');
  console.log('3. Update .gitignore');
  console.log('4. Commit and push');
}

uploadAllVideos().catch(console.error);
