import { Schema, model } from "mongoose";
import { ILesson } from "./lesson.interface";

// Lesson schema
const lessonSchema = new Schema<ILesson>(
    {
        title: {
            type: String,
            required: true
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
    },
    { timestamps: true }
);

const Lesson = model<ILesson>("Lesson", lessonSchema);

export default Lesson;