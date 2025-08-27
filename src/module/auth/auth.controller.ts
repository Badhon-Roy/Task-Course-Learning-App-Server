import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";


const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        data: result,
    });
});

export const AuthControllers = {
    loginUser,
};