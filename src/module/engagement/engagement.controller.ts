import catchAsync from "../../utils/catchAsync";
import { EngagementServices } from "./engagement.service";

// Track a new engagement
const createEngagement = catchAsync(async (req, res) => {
  const result = await EngagementServices.createEngagementInDB(req.body);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Engagement tracked successfully",
    data: result,
  });
});

// Get all engagements
const getAllEngagements = catchAsync(async (req, res) => {
  const result = await EngagementServices.getAllEngagementsFromDB();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "All engagements retrieved successfully",
    data: result,
  });
});

// Get engagements by student
const getEngagementByStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await EngagementServices.getEngagementByStudentFromDB(studentId);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Student engagements retrieved successfully",
    data: result,
  });
});

export const EngagementControllers = {
  createEngagement,
  getAllEngagements,
  getEngagementByStudent,
};