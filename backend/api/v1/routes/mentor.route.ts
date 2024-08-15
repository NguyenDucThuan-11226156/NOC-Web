import { Router } from "express";
import * as controller from "../controllers/mentor.controller";
import multer from "multer";
import * as uploadCloud from "../middlewares/uploadCloud.middleware";
// import * as authMiddleware from "../middlewares/auth.middleware";
const upload = multer();
const router: Router = Router();
router.post("/list", controller.listMentors);
router.post("/filter", controller.filterMentors);
router.post(
  "/create",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    {
      name: "companyLogo",
      maxCount: 1,
    },
  ]),
  uploadCloud.uploadFields,
  controller.createMentor
);
router.delete("/delete/:id", controller.deleteMentor);
router.post("/update/:id", controller.updateMentor);
router.post("/detail/:id", controller.detailMentor);

export const mentorRoutes: Router = router;
