import { Types, Document } from "mongoose";

export interface ILessonProgress {
  lesson: Types.ObjectId;
  completed: boolean;
  completedAt?: Date;
}

export interface ITopicProgress {
  topic: Types.ObjectId;
  completed: boolean;
  completedAt?: Date;
}

export interface IEnrollment {
  student: Types.ObjectId;
  course: Types.ObjectId;
  lessonsProgress: ILessonProgress[];
  topicsProgress: ITopicProgress[];
  enrolledAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
