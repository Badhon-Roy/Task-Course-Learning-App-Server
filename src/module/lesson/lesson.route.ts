import express from "express";
import { LessonControllers } from "./lesson.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { LessonValidations } from "./lesson.validation";

const router = express.Router();

router.post("/",validateRequest(LessonValidations.createLessonValidation) ,auth(USER_ROLE.teacher), LessonControllers.createLesson);
router.get("/", LessonControllers.getAllLessons);
router.patch("/:id", auth(USER_ROLE.teacher), LessonControllers.updateLesson);
router.delete("/:id", auth(USER_ROLE.teacher), LessonControllers.deleteLesson);

export const lessonRouter = router;