import { NextResponse } from 'next/server';
import { getImagesFromFolder } from '@/utils/cloudinary';

export async function GET(request) {
  try {
    // Get folder parameter from the URL query string
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder');
    
    if (!folder) {
      return NextResponse.json(
        { error: 'Folder parameter is required' },
        { status: 400 }
      );
    }
    
    // Fetch images from the specified Cloudinary folder
    const images = await getImagesFromFolder(folder);
    
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error in Cloudinary API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images from Cloudinary' },
      { status: 500 }
    );
  }
}