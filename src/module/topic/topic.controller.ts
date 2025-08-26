import catchAsync from "../../utils/catchAsync";
import { TopicServices } from "./topic.service";


// Create a topic
const createTopic = catchAsync(async (req, res) => {
  const topic = {
    ...req.body,
  };
  const result = await TopicServices.createTopicInDB(topic);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Topic created successfully",
    data: result,
  });
});

// Get all topics
const getAllTopics = catchAsync(async (req, res) => {
  const result = await TopicServices.getAllTopicsFromDB();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Topics retrieved successfully",
    data: result,
  });
});

// Update a topic
const updateTopic = catchAsync(async (req, res) => {
  const result = await TopicServices.updateTopicById(req.params.id, req.body);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Validation Error",
      errorMessage: "Topic not found",
    });
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Topic updated successfully",
    data: result,
  });
});

// Delete a topic
const deleteTopic = catchAsync(async (req, res) => {
  const result = await TopicServices.deleteTopicById(req.params.id);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Validation Error",
      errorMessage: "Topic not found",
    });
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Topic deleted successfully",
    data: result,
  });
});

export const TopicControllers = {
  createTopic,
  getAllTopics,
  updateTopic,
  deleteTopic,
};