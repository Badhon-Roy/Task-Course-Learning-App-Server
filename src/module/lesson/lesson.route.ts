import express from "express";
import { LessonControllers } from "./lesson.controller";

const router = express.Router();

router.post("/", LessonControllers.createLesson);
router.get("/", LessonControllers.getAllLessons);
router.patch("/:id", LessonControllers.updateLesson);
router.delete("/:id", LessonControllers.deleteLesson);

export const lessonRouter = router;