import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import Lesson from "./lesson.model";
import { LessonServices } from "./lesson.service";


// Create a lesson
const createLesson = catchAsync(async (req, res) => {
  const lesson = {
    ...req.body,
  };

  // Check if lesson with the same title already exists
  const isExistLesson = await Lesson.findOne({ title: lesson?.title });
  if (isExistLesson) {
    throw new AppError(400,"This lesson already exists");
  }

  const result = await LessonServices.createLessonInDB(lesson);
  
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Lesson created successfully",
    data: result,
  });
});

// Get all lessons
const getAllLessons = catchAsync(async (req, res) => {
  const result = await LessonServices.getAllLessonsFromDB();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Lessons retrieved successfully",
    data: result,
  });
});

// Update a lesson
const updateLesson = catchAsync(async (req, res) => {
  const result = await LessonServices.updateLessonById(req?.params?.id, req.body);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Validation Error",
      errorMessage: "Lesson not found",
    });
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Lesson updated successfully",
    data: result,
  });
});

// Delete a lesson
const deleteLesson = catchAsync(async (req, res) => {
  const result = await LessonServices.deleteLessonById(req.params.id);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Validation Error",
      errorMessage: "Lesson not found",
    });
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Lesson deleted successfully",
    data: result,
  });
});

export const LessonControllers = {
  createLesson,
  getAllLessons,
  updateLesson,
  deleteLesson,
};