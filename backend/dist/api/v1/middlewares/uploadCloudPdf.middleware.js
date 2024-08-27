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
const streamUpload = (buffer, filename) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary_1.v2.uploader.upload_stream({
            resource_type: "raw",
            public_id: filename.replace(/\.pdf$/, ""),
            tags: "pdf",
        }, (error, result) => {
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
const uploadToCloudinary = (buffer, filename) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield streamUpload(buffer, filename);
    return result;
});
const uploadSingle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req["file"];
        const result = yield uploadToCloudinary(file.buffer, file.originalname);
        req.body[file.fieldname] = {
            url: result["url"],
            originalFilename: file.originalname,
        };
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error uploading file to Cloudinary");
        return;
    }
    next();
});
exports.uploadSingle = uploadSingle;
const uploadFields = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const key in req["files"]) {
            req.body[key] = [];
            const array = req["files"][key];
            for (const item of array) {
                try {
                    const result = yield uploadToCloudinary(item.buffer, item.originalname);
                    req.body[key].push({
                        url: result["url"],
                        originalFilename: item.originalname,
                    });
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error uploading files to Cloudinary");
        return;
    }
    next();
});
exports.uploadFields = uploadFields;
