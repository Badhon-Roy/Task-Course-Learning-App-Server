import express from "express";
import { EnrollmentController } from "./enrollment.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post("/", auth(USER_ROLE.student), EnrollmentController.enroll);
router.post("/:courseId/sync", auth(USER_ROLE.student), EnrollmentController.sync);

router.patch("/:courseId/lessons/:lessonId/complete", auth(USER_ROLE.student), EnrollmentController.completeLesson);
router.patch("/:courseId/topics/:topicId/complete", auth(USER_ROLE.student), EnrollmentController.completeTopic);

router.get("/:courseId", auth(USER_ROLE.student), EnrollmentController.myEnrollment);
router.get("/:courseId/progress", auth(USER_ROLE.student), EnrollmentController.myProgress);

export const enrollmentRouter = router;
