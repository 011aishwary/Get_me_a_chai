"use server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function uploadImage(file: File) {
  
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { tags: ["nextjs-upload"] },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result?.secure_url); // This is your image URL
      }
    ).end(buffer);
  });
}