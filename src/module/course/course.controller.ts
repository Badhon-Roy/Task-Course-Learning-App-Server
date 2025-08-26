import catchAsync from "../../utils/catchAsync";
import { CourseServices } from "./course.service";


const createCourse = catchAsync(async (req, res) => {
    const course = req.body;
    const result = await CourseServices.createCourseIntoDB(course);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Course created successfully',
        data: result
    })
});

export const CourseControllers = {
    createCourse,
}