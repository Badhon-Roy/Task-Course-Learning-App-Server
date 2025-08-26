import { Schema } from "mongoose";

export interface ITopic {
  title: string;
  content: string;
  lesson: Schema.Types.ObjectId; // Reference to Lesson
}