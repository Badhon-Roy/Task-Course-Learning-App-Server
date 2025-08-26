import { Schema, Types } from "mongoose";

export interface ICourse {
    title: string;
    description: string;
    teacher: Types.ObjectId; // ref : 'User'
    views: number;
    likes: number;
    likedBy: Schema.Types.ObjectId[];
    feedbacks: { student: Schema.Types.ObjectId; comment: string }[];
}