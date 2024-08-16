import { Router } from "express";
import * as controller from "../controllers/admin.controller";
import multer from "multer";
import * as uploadCloud from "../middlewares/uploadCloud.middleware";
// import * as authMiddleware from "../middlewares/auth.middleware";
const upload = multer();
const router: Router = Router();
router.post("/register", controller.register);
router.post("/login", controller.login);

export const adminRoutes: Router = router;
