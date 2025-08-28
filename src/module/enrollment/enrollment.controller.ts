import { Request } from "express";
import catchAsync from "../../utils/catchAsync";
import { EnrollmentService } from "./enrollment.service";
import Enrollment from "./enrollment.model";

const enroll = catchAsync(async (req, res) => {
    const studentId = req?.user?.id;
    const { courseId } = req.body;

    // Check if already enrolled
    const isAlreadyEnrolled = await Enrollment.findOne({ student: studentId, course: courseId });
    if (isAlreadyEnrolled) {
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Already Enrolled",
            data: {}
        });
    }

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
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Synced",
        data: result
    });
});

const myEnrollment = catchAsync(async (req, res) => {
    const studentId = req?.user?.id;
    const { courseId } = req.params;
    const result = await EnrollmentService.getEnrollment(studentId, courseId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Enrollment",
        data: result
    });
});

export const EnrollmentController = {
    enroll,
    sync,
    myEnrollment
};
