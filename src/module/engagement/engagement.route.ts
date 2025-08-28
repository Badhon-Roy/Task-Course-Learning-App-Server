import { Router } from "express";
import { EngagementControllers } from "./engagement.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";


const route = Router();

route.post('/track-engagement', EngagementControllers.createEngagement);
route.get('/', EngagementControllers.getAllEngagements);
route.get('/student/:studentId', EngagementControllers.getEngagementByStudent);
route.get("/course/:courseId", auth(USER_ROLE.teacher), EngagementControllers.getCourseEngagement);

export const engagementRouter = route;