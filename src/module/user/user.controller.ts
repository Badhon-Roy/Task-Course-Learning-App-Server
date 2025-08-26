import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";


const createUser = catchAsync(async (req, res) => {
    const user = req.body;
    const result = await UserServices.createUserIntoDB(user);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'User created successfully',
        data: result
    })
});

export const UserControllers = {
    createUser,
}