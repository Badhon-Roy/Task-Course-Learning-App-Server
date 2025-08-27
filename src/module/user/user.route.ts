import { Router } from "express";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = Router();

router.post('/create-user', UserControllers.createUser)
router.put("/:teacherId/follow", auth(USER_ROLE.student), UserControllers.followTeacher);
router.get("/:teacherId/followers", UserControllers.getTeacherFollowers);

export const userRouter = router;