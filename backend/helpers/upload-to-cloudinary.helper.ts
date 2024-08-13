import cloudinary from "cloudinary";
import streamifier from "streamifier";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
interface UploadApiResponse {
  url: string;
  // Add other properties as needed
}
const streamUpload = async (buffer: unknown): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export default async (buffer: any) => {
  try {
    const result = (await streamUpload(buffer)) as UploadApiResponse;
    return result.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};
