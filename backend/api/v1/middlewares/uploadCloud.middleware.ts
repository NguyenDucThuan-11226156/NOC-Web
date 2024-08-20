import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
dotenv.config();

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Function to handle file upload
const streamUpload = (buffer: Buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Pipe the file buffer to Cloudinary
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// Function to upload a single file
const uploadToCloudinary = async (buffer: Buffer) => {
  try {
    const result = await streamUpload(buffer);
    return result["url"];
  } catch (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }
};

// Middleware for handling single file uploads
export const uploadSingle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.file && req.file.buffer) {
      const result = await uploadToCloudinary(req.file.buffer);
      req.body[req.file.fieldname] = result;
    }
    next();
  } catch (error) {
    console.error("Upload Single Error:", error);
    next(error);
  }
};

// Middleware for handling multiple file uploads
export const uploadFields = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.files) {
      for (const key in req.files) {
        req.body[key] = [];

        const files = req.files[key];
        for (const file of files as Express.Multer.File[]) {
          if (file.buffer) {
            const result = await uploadToCloudinary(file.buffer);
            req.body[key].push(result);
          }
        }
      }
    }
    next();
  } catch (error) {
    console.error("Upload Fields Error:", error);
    next(error);
  }
};
