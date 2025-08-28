import express from "express";
import { EnrollmentController } from "./enrollment.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post("/", auth(USER_ROLE.student), EnrollmentController.enroll);
router.post("/:courseId/sync", auth(USER_ROLE.student), EnrollmentController.sync);
router.get("/:courseId", auth(USER_ROLE.student), EnrollmentController.myEnrollment);

export const enrollmentRouter = router;
