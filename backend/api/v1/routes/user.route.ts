import { Router } from "express";
import * as controller from "../controllers/user.controller";
import * as authMiddleware from "../middlewares/auth.middleware";
import multer from "multer";
import * as uploadCloud from "../middlewares/uploadCloud.middleware";
import * as uploadCloudPdf from "../middlewares/uploadCloudPdf.middleware";
import {
  configureStorage,
  configureStoragePdf,
} from "../../../helpers/storage-multer.helper";
// import * as authMiddleware from "../middlewares/auth.middleware";
const upload = multer({ storage: configureStorage() });
const upload2 = multer({ storage: configureStoragePdf() });
const router: Router = Router();
// fetch("localhost:8000/api/v1/users/register")
router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/password/forgot", controller.forgotPasswordPost);
router.post("/password/otp", controller.otpPasswordPost);
router.post("/password/reset", controller.resetPasswordPost);
router.get("/detail", authMiddleware.requireAuth, controller.detail);
router.get("/detailPure", authMiddleware.requireAuth, controller.detailPure);
router.delete(
  "/deleteSaveMentor/:id",
  authMiddleware.requireAuth,
  controller.deleteSaveMentor
);
router.post(
  "/update",
  authMiddleware.requireAuth,
  upload.single("avatar"),
  // uploadCloud.uploadSingle,
  controller.updateUser
);
router.post("/updateSave", authMiddleware.requireAuth, controller.updateUser);
router.post(
  "/applyNow/:mentorId",
  authMiddleware.requireAuth,
  upload2.single("cv"),
  controller.applyNow
);
router.post(
  "/rateMentor/:id",
  authMiddleware.requireAuth,
  controller.rateMentor
);
router.post(
  "/reviewMentor/:id",
  authMiddleware.requireAuth,
  controller.reviewMentor
);
export const userRoutes: Router = router;
