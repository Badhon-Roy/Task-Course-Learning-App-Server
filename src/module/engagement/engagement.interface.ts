import { Types } from "mongoose";


export interface IEngagement {
    studentId: Types.ObjectId;
    courseId: Types.ObjectId;
    lessonId: Types.ObjectId;
    topicId: Types.ObjectId;
    viewed: boolean;
    completed: boolean;
    timeSpent: number;
    lastAccessed: Date;
}