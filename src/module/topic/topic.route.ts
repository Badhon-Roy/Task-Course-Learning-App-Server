import express from "express";
import { TopicControllers } from "./topic.controller";

const router = express.Router();

// Only teachers can create, update, delete topics
router.post("/", TopicControllers.createTopic);
router.get("/", TopicControllers.getAllTopics);
router.put("/:id", TopicControllers.updateTopic);
router.delete("/:id", TopicControllers.deleteTopic);

export const topicRouter = router;