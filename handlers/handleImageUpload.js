import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
import { nanoid } from 'nanoid';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

export const uploadToCloudinary = async (filename, file)=> {
  const uniqueId = nanoid(5);

  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'AYURCHIKITSA',
      public_id: `image${filename}${uniqueId}`, // Optional: Custom filename (public_id)
    });

    // Delete the file after upload
    fs.unlinkSync(file.path);

    return result.secure_url; // Return the URL of the uploaded file
  } catch (error) {
    throw new Error('Error uploading file to Cloudinary: ' + error.message);
  }
};