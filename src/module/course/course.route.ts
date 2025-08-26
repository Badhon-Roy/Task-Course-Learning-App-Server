import { Router } from "express";
import { CourseControllers } from "./course.controller";


const route = Router();
route.post('/create-course', CourseControllers.createCourse),
route.get('/get-courses', CourseControllers.getAllCourses);
route.patch('/update-course/:id', CourseControllers.updateCourse);
route.delete('/delete-course/:id', CourseControllers.deleteCourse);

export const courseRouter = route;