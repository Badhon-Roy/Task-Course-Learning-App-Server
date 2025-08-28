import { model, Schema } from "mongoose";
import { IEngagement } from "./engagement.interface";

// Engagement schema
const engagementSchema = new Schema<IEngagement>(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        courseId: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
        lessonId: {
            type: Schema.Types.ObjectId,
            ref: "Lesson",
            required: true
        },
        topicId: {
            type: Schema.Types.ObjectId,
            ref: "Topic",
            required: true
        },
        viewed: {
            type: Boolean,
            default: false
        },
        completed: {
            type: Boolean,
            default: false
        },
        timeSpent: {
            type: Number,
            default: 0
        },
        lastAccessed: {
            type: Date,
            default: Date.now
        },
    },
    { timestamps: true }
);

const Engagement = model<IEngagement>("Engagement", engagementSchema);
export default Engagement;