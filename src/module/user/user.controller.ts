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


// Student follows a teacher
const followTeacher = catchAsync(async (req, res) => {
  const studentId = req.user._id;
  const teacherId = req.params.teacherId;

  const result = await UserServices.followTeacher(studentId, teacherId);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "You are now following this teacher",
    data: result,
  });
});

// Get teacher followers
const getTeacherFollowers = catchAsync(async (req, res) => {
  const teacherId = req.params.teacherId;
  const result = await UserServices.getTeacherFollowers(teacherId);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Teacher followers retrieved",
    data: result?.followers,
  });
});


export const UserControllers = {
    createUser,
    followTeacher,
    getTeacherFollowers
}