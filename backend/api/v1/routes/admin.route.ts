import { Router } from "express";
import * as controller from "../controllers/admin.controller";
import multer from "multer";
// import * as authMiddleware from "../middlewares/auth.middleware";
const upload = multer();
const router: Router = Router();
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/listCategory", controller.listCategory);
router.post("/createCategory", controller.createCategory);

export const adminRoutes: Router = router;
