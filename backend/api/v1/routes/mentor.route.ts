import { Router } from "express";
import * as controller from "../controllers/mentor.controller";

// import * as authMiddleware from "../middlewares/auth.middleware";

const router: Router = Router();
router.post("/list", controller.listMentors);
router.post("/filter", controller.filterMentors);
router.post("/create", controller.createMentor);
router.delete("/delete/:id", controller.deleteMentor);
router.post("/update/:id", controller.updateMentor);

export const mentorRoutes: Router = router;
