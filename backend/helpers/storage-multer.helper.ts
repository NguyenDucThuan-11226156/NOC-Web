import multer from "multer";
import fs from "fs";
import path from "path";
import { Request } from "express";

export const configureStorage = (): multer.StorageEngine => {
  const uploadDir = path.join(__dirname, "../public/uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req: Request, file, cb) => {
      const prefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileName = `${prefix}-${file.originalname}`;

      // Save the relative URL instead of full system path
      req["filePath"] = `/uploads/${fileName}`; // Save relative path

      cb(null, fileName); // Save just the filename
    },
  });

  return storage;
};
export const configureStoragePdf = (): multer.StorageEngine => {
  const uploadDir = path.join(__dirname, "../public/pdf");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req: Request, file, cb) => {
      const prefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileName = `${prefix}-${file.originalname}`;

      // Save the relative URL instead of full system path
      req["filePath"] = `/pdf/${fileName}`; // Save relative path

      cb(null, fileName); // Save just the filename
    },
  });

  return storage;
};
