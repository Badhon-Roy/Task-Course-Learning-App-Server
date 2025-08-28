import { Schema, model } from "mongoose";
import { ITopic } from "./topic.interface";


const topicSchema = new Schema<ITopic>(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        lesson: {
            type: Schema.Types.ObjectId,
            ref: "Lesson",
            required: true
        },
    },
    { timestamps: true }
);

const Topic = model<ITopic>("Topic", topicSchema);

export default Topic;