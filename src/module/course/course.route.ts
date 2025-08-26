import { Router } from "express";
import { CourseControllers } from "./course.controller";


const route = Router();
route.post('/create-course', CourseControllers.createCourse),
route.get('/get-courses', CourseControllers.getAllCourses);
route.patch('/update-course/:id', CourseControllers.updateCourse);
route.delete('/delete-course/:id', CourseControllers.deleteCourse);

// Student actions
route.put("/:id/view", CourseControllers.viewCourse);
route.put("/:id/like", CourseControllers.likeCourse);
route.post("/:id/feedback", CourseControllers.addFeedback);

// Teacher analytics
route.get("/performance/analytics", CourseControllers.courseAnalytics);

export const courseRouter = route;