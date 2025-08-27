import express from "express";
import { TopicControllers } from "./topic.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";

const router = express.Router();

// Only teachers can create, update, delete topics
router.post("/", auth(USER_ROLE.teacher), TopicControllers.createTopic);
router.get("/", TopicControllers.getAllTopics);
router.put("/:id", auth(USER_ROLE.teacher), TopicControllers.updateTopic);
router.delete("/:id", auth(USER_ROLE.teacher), TopicControllers.deleteTopic);

export const topicRouter = router;