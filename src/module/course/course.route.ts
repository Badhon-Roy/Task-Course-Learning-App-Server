import { Router } from "express";
import { CourseControllers } from "./course.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";


const route = Router();

route.get('/get-courses', CourseControllers.getAllCourses);

// Teacher actions
route.post('/create-course', auth(USER_ROLE.teacher), CourseControllers.createCourse),
route.patch('/update-course/:id', auth(USER_ROLE.teacher), CourseControllers.updateCourse);
route.delete('/delete-course/:id', auth(USER_ROLE.teacher), CourseControllers.deleteCourse);
route.get("/performance/analytics", auth(USER_ROLE.teacher), CourseControllers.courseAnalytics);


// Student actions
route.put("/:courseId/view", auth(USER_ROLE.student), CourseControllers.viewCourse);
route.put("/:courseId/like", auth(USER_ROLE.student), CourseControllers.likeCourse);
route.post("/:courseId/feedback", auth(USER_ROLE.student), CourseControllers.addFeedback);
route.put("/:id/follow", auth(USER_ROLE.student), CourseControllers.followCourse);
route.get("/:id/followers", auth(USER_ROLE.student), CourseControllers.getCourseFollowers);







export const courseRouter = route;