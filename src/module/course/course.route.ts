import { Router } from "express";
import { CourseControllers } from "./course.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";


const router = Router();

router.get('/', CourseControllers.getAllCourses);
router.get('/:courseId', CourseControllers.getSingleCourse);


// Teacher actions
router.post('/create-course', auth(USER_ROLE.teacher), CourseControllers.createCourse),
router.patch('/update-course/:id', auth(USER_ROLE.teacher), CourseControllers.updateCourse);
router.delete('/delete-course/:id', auth(USER_ROLE.teacher), CourseControllers.deleteCourse);
router.get("/performance/analytics", auth(USER_ROLE.teacher), CourseControllers.courseAnalytics);


// Student actions
router.put("/:courseId/view", auth(USER_ROLE.student), CourseControllers.viewCourse);
router.put("/:courseId/like", auth(USER_ROLE.student), CourseControllers.likeCourse);
router.post("/:courseId/feedback", auth(USER_ROLE.student), CourseControllers.addFeedback);
router.put("/:id/follow", auth(USER_ROLE.student), CourseControllers.followCourse);
router.get("/:id/followers", auth(USER_ROLE.student), CourseControllers.getCourseFollowers);
router.patch("/:courseId/lessons/:lessonId/complete", auth(USER_ROLE.student), CourseControllers.completeLesson);
router.patch("/:courseId/topics/:topicId/complete", auth(USER_ROLE.student), CourseControllers.completeTopic);
router.get("/:courseId/progress", auth(USER_ROLE.student), CourseControllers.myProgress);


export const courseRouter = router;