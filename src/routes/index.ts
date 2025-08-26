import { Router } from "express";
import { userRouter } from "../module/user/user.route";
import { courseRouter } from "../module/course/course.route";
import { lessonRouter } from "../module/lesson/lesson.route";
import { topicRouter } from "../module/topic/topic.route";

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
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;