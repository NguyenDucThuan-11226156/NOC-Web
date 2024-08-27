"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = require("./user.route");
const mentor_route_1 = require("./mentor.route");
const admin_route_1 = require("./admin.route");
const mainV1Routes = (app) => {
    const version = "/api/v1";
    app.use(version + "/users", user_route_1.userRoutes);
    app.use(version + "/mentors", mentor_route_1.mentorRoutes);
    app.use(version + "/admin", admin_route_1.adminRoutes);
};
exports.default = mainV1Routes;
