import { model, Schema } from "mongoose";
import { IEnrollment, ILessonProgress, ITopicProgress } from "./enrollment.interface";


const LessonProgressSchema = new Schema<ILessonProgress>(
    {
        lesson: {
            type: Schema.Types.ObjectId,
            ref: "Lesson",
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        completedAt: {
            type: Date
        },
    },
    { _id: false }
);

const TopicProgressSchema = new Schema<ITopicProgress>(
    {
        topic: {
            type: Schema.Types.ObjectId,
            ref: "Topic",
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        completedAt: {
            type: Date
        },
    },
    { _id: false }
);

const EnrollmentSchema = new Schema<IEnrollment>(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
        lessonsProgress: {
            type: [LessonProgressSchema],
            default: []
        },
        topicsProgress: {
            type: [TopicProgressSchema],
            default: []
        },
        enrolledAt: {
            type: Date,
            default: Date.now
        },
    },
    { timestamps: true }
);

// prevent duplicate enrollments
EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

const Enrollment = model<IEnrollment>("Enrollment", EnrollmentSchema);
export default Enrollment;