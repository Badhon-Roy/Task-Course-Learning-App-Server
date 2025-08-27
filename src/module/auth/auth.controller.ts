import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";


const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const { refreshToken, accessToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config.node_env === 'production',
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        data: {
            accessToken
        },
    });
});

const logoutUser = catchAsync(async (req, res) => {
    res.clearCookie('refreshToken')

    res.status(200).json({
        message: 'User logged out successfully',
        success: true,
        data: {}
    })
});

export const AuthControllers = {
    loginUser,
    logoutUser
};