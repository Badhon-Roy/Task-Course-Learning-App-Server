import { model, Schema } from "mongoose";
import { ICourse } from "./course.interface";

const courseSchema = new Schema<ICourse>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    feedbacks: [
        {
            student: { type: Schema.Types.ObjectId, ref: "User" },
            comment: { type: String },
        },
    ],
},
    { timestamps: true });

export const Course = model<ICourse>('Course', courseSchema);
export default Course;