import { Router } from "express";
import { userRouter } from "../module/user/user.route";
import { courseRouter } from "../module/course/course.route";
import { lessonRouter } from "../module/lesson/lesson.route";
import { topicRouter } from "../module/topic/topic.route";
import { authRouter } from "../module/auth/auth.route";
import { enrollmentRouter } from "../module/enrollment/enrollment.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route : userRouter
    },
    {
        path: '/courses',
        route: courseRouter
    },
    {
        path: '/lesson',
        route: lessonRouter
    },
    {
        path: '/topic',
        route: topicRouter
    },
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/enrollment',
        route: enrollmentRouter
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;