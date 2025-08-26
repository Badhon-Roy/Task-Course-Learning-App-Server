import { Router } from "express";
import { CourseControllers } from "./course.controller";


const route = Router();

route.get('/get-courses', CourseControllers.getAllCourses);

// Teacher actions
route.post('/create-course', CourseControllers.createCourse),
route.patch('/update-course/:id', CourseControllers.updateCourse);
route.delete('/delete-course/:id', CourseControllers.deleteCourse);
route.get("/performance/analytics", CourseControllers.courseAnalytics);

// Student actions
route.put("/:id/view", CourseControllers.viewCourse);
route.put("/:id/like", CourseControllers.likeCourse);
route.post("/:id/feedback", CourseControllers.addFeedback);
route.put("/:id/follow", CourseControllers.followCourse);
route.get("/:id/followers", CourseControllers.getCourseFollowers);
route.get("/:id/engagement", CourseControllers.getEngagement);






export const courseRouter = route;