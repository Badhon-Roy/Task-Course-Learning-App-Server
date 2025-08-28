// controllers/course.controller.ts
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import Course from "./course.model";
import { CourseServices } from "./course.service";

// Create a new course
const createCourse = catchAsync(async (req, res) => {
  
    const course = {
        ...req.body,
        teacher: req.user.id
    };

    // Check if course with the same title already exists
    const isExistCourse = await Course.findOne({ title: course?.title });
    if (isExistCourse) {
        throw new AppError(400,"This course already exists");
    }

    const result = await CourseServices.createCourseIntoDB(course);
    res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Course created successfully",
        data: result,
    });
});

// Get all courses
const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDB();
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Courses retrieved successfully",
        data: result,
    });
});

// Update a course by ID
const updateCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.updateCourseById(req?.params?.id, req.body);
    if (!result) {
        return res.status(404).json({
            success: false,
            message: "Validation Error",
            errorMessage: "Course not found",
        });
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Course updated successfully",
        data: result,
    });
});

// Delete a course by ID
const deleteCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.deleteCourseById(req?.params?.id);
    if (!result) {
        return res.status(404).json({
            success: false,
            message: "Validation Error",
            errorMessage: "Course not found",
        });
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Course deleted successfully",
        data: result,
    });
});

// Increment course view
const viewCourse = catchAsync(async (req, res) => {
    const courseId = req.params.id;
    const result = await CourseServices.incrementCourseView(courseId);

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Course view incremented",
        data: result,
    });
});

// Like a course
const likeCourse = catchAsync(async (req, res) => {
    const courseId = req.params.id;
    const studentId = req.user.id;
    const result = await CourseServices.likeCourse(courseId, studentId);

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Course liked successfully",
        data: result,
    });
});

// Add feedback
const addFeedback = catchAsync(async (req, res) => {
    const courseId = req.params.id;
    //   const studentId = req.user.id;
    const studentId = req.user.id;
    const { comment } = req.body;
    const result = await CourseServices.addCourseFeedback(courseId, studentId, comment);

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Feedback added successfully",
        data: result,
    });
});

// Get analytics for teacher
const courseAnalytics = catchAsync(async (req, res) => {
    //   const teacherId = req.user.id;
    const teacherId = req.user.id;
    const result = await CourseServices.getCourseAnalytics(teacherId);

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Course analytics retrieved",
        data: result,
    });
});

// Follow a course
const followCourse = catchAsync(async (req, res) => {
    const courseId = req.params.id;
    const studentId = req.user.id;
    const result = await CourseServices.followCourse(courseId, studentId);

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "You are now following this course",
        data: result,
    });
});

// Get all followers
const getCourseFollowers = catchAsync(async (req, res) => {
    const courseId = req.params.id;
    const result = await CourseServices.getCourseFollowers(courseId);

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Course followers retrieved",
        data: result?.followers,
    });
});

// Get engagement stats
const getEngagement = catchAsync(async (req, res) => {
    const courseId = req?.params?.id;
    const result = await CourseServices.getCourseEngagement(courseId);

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Course engagement retrieved",
        data: result,
    });
});


export const CourseControllers = {
    createCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    viewCourse,
    likeCourse,
    addFeedback,
    courseAnalytics,
    followCourse,
    getCourseFollowers,
    getEngagement
};