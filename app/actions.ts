"use server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function uploadImage(file: File , oldPublicId?: string) {
    // 1. Delete the old image if a Public ID exists
    console.log("Old Public ID:", oldPublicId);
  if (oldPublicId) {
    await cloudinary.uploader.destroy(oldPublicId);
  }
  
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "user_uploads" },
      (error, result) => {
        if (error) return reject(error);
        // Return both URL and Public ID
        resolve({
          url: result?.secure_url,
          publicId: result?.public_id,
        });
      }
    );
    uploadStream.end(buffer);
  });
}