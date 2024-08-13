import uploadToCloudinary from "../../../helpers/upload-to-cloudinary.helper";
export const uploadSingle = async (req, res, next) => {
  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer);
    req.body[req.file.fieldname] = result;
  }
  next();
};
