"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFields = exports.uploadSingle = void 0;
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});
const streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
        streamifier_1.default.createReadStream(buffer).pipe(stream);
    });
};
const uploadToCloudinary = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield streamUpload(buffer);
        return result["url"];
    }
    catch (error) {
        throw new Error(`Upload failed: ${error.message}`);
    }
});
const uploadSingle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file && req.file.buffer) {
            const result = yield uploadToCloudinary(req.file.buffer);
            req.body[req.file.fieldname] = result;
        }
        next();
    }
    catch (error) {
        console.error("Upload Single Error:", error);
        next(error);
    }
});
exports.uploadSingle = uploadSingle;
const uploadFields = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.files) {
            for (const key in req.files) {
                req.body[key] = [];
                const files = req.files[key];
                for (const file of files) {
                    if (file.buffer) {
                        const result = yield uploadToCloudinary(file.buffer);
                        req.body[key].push(result);
                    }
                }
            }
        }
        next();
    }
    catch (error) {
        console.error("Upload Fields Error:", error);
        next(error);
    }
});
exports.uploadFields = uploadFields;
