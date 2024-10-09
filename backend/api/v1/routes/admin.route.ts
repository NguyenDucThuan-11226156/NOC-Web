import { Router } from "express";
import * as controller from "../controllers/admin.controller";
import multer from "multer";
import * as authMiddleware from "../middlewares/authAdmin.middleware";
import * as uploadCloud from "../middlewares/uploadCloud.middleware";
// import * as authMiddleware from "../middlewares/auth.middleware";
const upload = multer();
const router: Router = Router();
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/listCategory", controller.listCategory);

router.post(
  "/createCategory",
  authMiddleware.requireAuth,
  controller.createCategory
);
router.post(
  "/editDomain/:id",
  authMiddleware.requireAuth,
  controller.editDomain
);
router.post(
  "/editEnterprise/:id",
  authMiddleware.requireAuth,
  controller.editEnterprise
);
router.post(
  "/editSpecialization/:id",
  authMiddleware.requireAuth,
  controller.editSpecialization
);
router.post("/editStudy/:id", authMiddleware.requireAuth, controller.editStudy);
router.delete(
  "/deleteDomain/:id",
  authMiddleware.requireAuth,
  controller.deleteDomain
);
router.delete(
  "/deleteEnterprise/:id",
  authMiddleware.requireAuth,
  controller.deleteEnterprise
);
router.delete(
  "/deleteSpecialization/:id",
  authMiddleware.requireAuth,
  controller.deleteSpecialization
);
router.delete(
  "/deleteStudy/:id",
  authMiddleware.requireAuth,
  controller.deleteStudy
);
router.post(
  "/editUserBanner",
  authMiddleware.requireAuth,
  upload.single("file"),
  uploadCloud.uploadSingle,

  controller.editUserBanner
);
router.post(
  "/editAvatarDefault",
  authMiddleware.requireAuth,
  upload.single("file"),
  uploadCloud.uploadSingle,
  controller.editAvatarDefault
);
router.post(
  "/editHomeBanner",
  authMiddleware.requireAuth,
  upload.single("file"),
  uploadCloud.uploadSingle,
  controller.editHomeBanner
);
router.get("/getSettings", controller.getSettings);

router.post("/editPinnedMentor/:id", controller.editPinnedMentor);
router.get("/getSettings", controller.getSettings);
router.get("/excel", controller.excelExport);
export const adminRoutes: Router = router;
