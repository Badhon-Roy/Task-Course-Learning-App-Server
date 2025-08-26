import { Schema } from "mongoose";

export interface ICourse {
    title: string;
    description: string;
    teacher: Schema.Types.ObjectId; // ref : 'User'
}