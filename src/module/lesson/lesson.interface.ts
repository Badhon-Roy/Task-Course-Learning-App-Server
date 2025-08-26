import { Schema } from "mongoose";

export interface ILesson {
  title: string;
  course: Schema.Types.ObjectId; // Reference to Course
}