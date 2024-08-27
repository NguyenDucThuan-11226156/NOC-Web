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
exports.adminRoutes = void 0;
const express_1 = require("express");
const controller = __importStar(require("../controllers/admin.controller"));
const multer_1 = __importDefault(require("multer"));
const authMiddleware = __importStar(require("../middlewares/authAdmin.middleware"));
const uploadCloud = __importStar(require("../middlewares/uploadCloud.middleware"));
const upload = (0, multer_1.default)();
const router = (0, express_1.Router)();
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/listCategory", controller.listCategory);
router.post("/createCategory", authMiddleware.requireAuth, controller.createCategory);
router.post("/editDomain/:id", authMiddleware.requireAuth, controller.editDomain);
router.post("/editEnterprise/:id", authMiddleware.requireAuth, controller.editEnterprise);
router.post("/editSpecialization/:id", authMiddleware.requireAuth, controller.editSpecialization);
router.post("/editStudy/:id", authMiddleware.requireAuth, controller.editStudy);
router.delete("/deleteDomain/:id", authMiddleware.requireAuth, controller.deleteDomain);
router.delete("/deleteEnterprise/:id", authMiddleware.requireAuth, controller.deleteEnterprise);
router.delete("/deleteSpecialization/:id", authMiddleware.requireAuth, controller.deleteSpecialization);
router.delete("/deleteStudy/:id", authMiddleware.requireAuth, controller.deleteStudy);
router.post("/editUserBanner", authMiddleware.requireAuth, upload.single("file"), uploadCloud.uploadSingle, controller.editUserBanner);
router.post("/editAvatarDefault", authMiddleware.requireAuth, upload.single("file"), uploadCloud.uploadSingle, controller.editAvatarDefault);
router.post("/editHomeBanner", authMiddleware.requireAuth, upload.single("file"), uploadCloud.uploadSingle, controller.editHomeBanner);
router.get("/getSettings", controller.getSettings);
exports.adminRoutes = router;
