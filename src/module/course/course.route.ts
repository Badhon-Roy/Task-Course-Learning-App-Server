import { Router } from "express";
import { CourseControllers } from "./course.controller";


const route = Router();
route.post('/create-course', CourseControllers.createCourse)

export const courseRouter = route;