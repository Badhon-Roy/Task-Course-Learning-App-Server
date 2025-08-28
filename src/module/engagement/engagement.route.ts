import { Router } from "express";
import { EngagementControllers } from "./engagement.controller";


const route = Router();

route.post('/track-engagement', EngagementControllers.createEngagement);
route.get('/', EngagementControllers.getAllEngagements);
route.get('/student/:studentId', EngagementControllers.getEngagementByStudent);

export const engagementRouter = route;