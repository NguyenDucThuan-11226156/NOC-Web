"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const controller = __importStar(require("../controllers/user.controller"));
const authMiddleware = __importStar(require("../middlewares/auth.middleware"));
const multer_1 = __importDefault(require("multer"));
const uploadCloud = __importStar(require("../middlewares/uploadCloud.middleware"));
const uploadCloudPdf = __importStar(require("../middlewares/uploadCloudPdf.middleware"));
const upload = (0, multer_1.default)();
const router = (0, express_1.Router)();
router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/password/forgot", controller.forgotPasswordPost);
router.post("/password/otp", controller.otpPasswordPost);
router.post("/password/reset", controller.resetPasswordPost);
router.get("/detail", authMiddleware.requireAuth, controller.detail);
router.get("/detailPure", authMiddleware.requireAuth, controller.detailPure);
router.delete("/deleteSaveMentor/:id", authMiddleware.requireAuth, controller.deleteSaveMentor);
router.post("/update", authMiddleware.requireAuth, upload.single("avatar"), uploadCloud.uploadSingle, controller.updateUser);
router.post("/updateSave", authMiddleware.requireAuth, controller.updateUser);
router.post("/applyNow/:mentorId", authMiddleware.requireAuth, upload.single("cv"), uploadCloudPdf.uploadSingle, controller.applyNow);
router.post("/rateMentor/:id", authMiddleware.requireAuth, controller.rateMentor);
router.post("/reviewMentor/:id", authMiddleware.requireAuth, controller.reviewMentor);
exports.userRoutes = router;
