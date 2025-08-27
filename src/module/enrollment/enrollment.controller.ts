import { Request } from "express";
import catchAsync from "../../utils/catchAsync";
import { EnrollmentService } from "./enrollment.service";

const enroll = catchAsync(async (req, res) => {
    const studentId = req.user!.id;
    const { courseId } = req.body;
    const result = await EnrollmentService.enrollInCourse(studentId, courseId);
    res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Enrolled",
        data: result
    });
});

const sync = catchAsync(async (req, res) => {
    const studentId = req.user!.id;
    const { courseId } = req.params;
    const result = await EnrollmentService.ensureProgressSkeleton(studentId, courseId);
    res.json({ success: true, statusCode: 200, message: "Synced", data: result });
});

const completeLesson = catchAsync(async (req, res) => {
    const studentId = req.user!.id;
    const { courseId, lessonId } = req.params;
    const result = await EnrollmentService.markLessonCompleted(studentId, courseId, lessonId);
    res.json({ success: true, statusCode: 200, message: "Lesson completed", data: result });
});

const completeTopic = catchAsync(async (req, res) => {
    const studentId = req.user!.id;
    const { courseId, topicId } = req.params;
    const result = await EnrollmentService.markTopicCompleted(studentId, courseId, topicId);
    res.json({ success: true, statusCode: 200, message: "Topic completed", data: result });
});

const myEnrollment = catchAsync(async (req, res) => {
    const studentId = req.user!.id;
    const { courseId } = req.params;
    const result = await EnrollmentService.getEnrollment(studentId, courseId);
    res.json({ success: true, statusCode: 200, message: "Enrollment", data: result });
});

const myProgress = catchAsync(async (req, res) => {
    const studentId = req.user!.id;
    const { courseId } = req.params;
    const result = await EnrollmentService.getProgressSummary(studentId, courseId);
    res.json({ success: true, statusCode: 200, message: "Progress summary", data: result });
});

export const EnrollmentController = {
    enroll,
    sync,
    completeLesson,
    completeTopic,
    myEnrollment,
    myProgress,
};
