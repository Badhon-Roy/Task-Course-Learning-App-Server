// controllers/course.controller.ts
import catchAsync from "../../utils/catchAsync";
import { CourseServices } from "./course.service";

// Create a new course
const createCourse = catchAsync(async (req, res) => {
  const course = {
    ...req.body,
    teacher: '68addac36ff33924417ec79c' // TODO: must be change with logged in user id
  };
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

export const CourseControllers = {
  createCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
};