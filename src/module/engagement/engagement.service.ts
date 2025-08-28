import AppError from "../../errors/AppError";
import Course from "../course/course.model";
import Engagement from "./engagement.model";

const createEngagementInDB = async (payload: any) => {
    const result = await Engagement.create(payload);
    return result;
};

const getAllEngagementsFromDB = async () => {
    const result = await Engagement.find()
        .populate("studentId")
        .populate("courseId")
        .populate("lessonId")
        .populate("topicId")
    return result;
};

const getEngagementByStudentFromDB = async (studentId: string) => {
    const result = await Engagement.find({ studentId: studentId })
        .populate("courseId")
        .populate("lessonId")
        .populate("topicId")
    return result;
};

// Track course engagement: views, likes, feedback count
const getCourseEngagement = async (courseId: string) => {
  const course = await Course.findById(courseId).populate("feedbacks.student", "name email");
  if (!course) throw new AppError(404,"Course not found");

  return {
    views: course.views,
    likes: course.likes,
    feedbackCount: course.feedbacks.length,
    feedbacks: course.feedbacks.map(f => ({
      student: f.student,
      comment: f.comment,
    })),
    followers: course.followers.length,
  };
};

export const EngagementServices = {
    createEngagementInDB,
    getAllEngagementsFromDB,
    getEngagementByStudentFromDB,
    getCourseEngagement
};