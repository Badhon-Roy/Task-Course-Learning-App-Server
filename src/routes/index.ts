import { Router } from "express";
import { userRouter } from "../module/user/user.route";
import { courseRouter } from "../module/course/course.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route : userRouter
    },
    {
        path: '/courses',
        route: courseRouter
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;