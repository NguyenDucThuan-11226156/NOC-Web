import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const streamUpload = (buffer: any, filename: string) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw", // For non-image files
        public_id: filename.replace(/\.pdf$/, ""), // Optional: remove extension for Cloudinary public_id
        tags: "pdf", // Optional: Add tags if needed
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const uploadToCloudinary = async (buffer: any, filename: string) => {
  let result = await streamUpload(buffer, filename);
  return result;
};

export const uploadSingle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req["file"];
    const result = await uploadToCloudinary(file.buffer, file.originalname);
    req.body[file.fieldname] = {
      url: result["url"],
      originalFilename: file.originalname,
    };
  } catch (error) {
    console.log(error);
    res.status(500).send("Error uploading file to Cloudinary");
    return;
  }

  next();
};

export const uploadFields = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    for (const key in req["files"]) {
      req.body[key] = [];

      const array = req["files"][key];
      for (const item of array) {
        try {
          const result = await uploadToCloudinary(
            item.buffer,
            item.originalname
          );
          req.body[key].push({
            url: result["url"],
            originalFilename: item.originalname,
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error uploading files to Cloudinary");
    return;
  }
  next();
};
