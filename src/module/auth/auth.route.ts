import { Router } from "express";
import { AuthControllers } from "./auth.controller";


const router = Router();

router.post("/login", AuthControllers.loginUser)
router.post('/logout',
  AuthControllers.logoutUser
)

export const authRouter = router;