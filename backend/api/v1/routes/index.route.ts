import { Express } from "express";
// import { taskRoutes } from "./task.route";
import { userRoutes } from "./user.route";
import { mentorRoutes } from "./mentor.route";

// import * as authMiddleware from "../middlewares/auth.middleware";

const mainV1Routes = (app: Express): void => {
  const version: string = "/api/v1";

  //   app.use(version + "/tasks", authMiddleware.requireAuth, taskRoutes);

  app.use(version + "/users", userRoutes);
  app.use(version + "/mentors", mentorRoutes);
};
// localhost:8000/api/v1/users
export default mainV1Routes;
