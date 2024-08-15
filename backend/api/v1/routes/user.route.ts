import { Router } from "express";
import * as controller from "../controllers/user.controller";
import * as authMiddleware from "../middlewares/auth.middleware";
import multer from "multer";
import * as uploadCloud from "../middlewares/uploadCloud.middleware";
// import * as authMiddleware from "../middlewares/auth.middleware";
const upload = multer();
const router: Router = Router();
// fetch("localhost:8000/api/v1/users/register")
router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/password/forgot", controller.forgotPasswordPost);
router.post("/password/otp", controller.otpPasswordPost);
router.post("/password/reset", controller.resetPasswordPost);
router.get("/detail", authMiddleware.requireAuth, controller.detail);
router.get(
  "/deleteSaveMentor/:id",
  authMiddleware.requireAuth,
  controller.deleteSaveMentor
);
router.post(
  "/update",
  authMiddleware.requireAuth,
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  controller.updateUser
);

export const userRoutes: Router = router;
