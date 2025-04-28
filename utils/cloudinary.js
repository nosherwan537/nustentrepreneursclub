import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to get images from a specific folder
export async function getImagesFromFolder(folderName) {
  try {
    const result = await cloudinary.search
      .expression(`folder:${folderName}`)
      .sort_by('created_at', 'desc')
      .max_results(20)
      .execute();
    
    return result.resources.map(resource => ({
      id: resource.public_id,
      url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      format: resource.format,
      createdAt: resource.created_at
    }));
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    return [];
  }
}

// Function to build a Cloudinary URL with transformations
export function buildCloudinaryUrl(publicId, { width = 800, height = 600, quality = 'auto', format = 'auto' } = {}) {
  return cloudinary.url(publicId, {
    width,
    height,
    quality,
    crop: 'fill',
    fetch_format: format,
  });
}