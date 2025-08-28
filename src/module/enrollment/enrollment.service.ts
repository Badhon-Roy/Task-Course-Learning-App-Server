import { Types } from "mongoose";
import Lesson from "../lesson/lesson.model";
import Topic from "../topic/topic.model";
import Enrollment from "./enrollment.model";


const enrollInCourse = async (studentId: string, courseId: string) => {
  const existing = await Enrollment.findOne({ student: studentId, course: courseId });
  if (existing) return existing;

  const lessons = await Lesson.find({ course: courseId }).select("_id").lean();
  const lessonIds = lessons.map(l => l._id);
  const topics = await Topic.find({ lesson: { $in: lessonIds } }).select("_id").lean();
  const topicIds = topics.map(t => t._id);

  const enrollment = await Enrollment.create({
    student: new Types.ObjectId(studentId),
    course: new Types.ObjectId(courseId),
    lessonsProgress: lessonIds.map(id => ({ lesson: id, completed: false })),
    topicsProgress: topicIds.map(id => ({ topic: id, completed: false })),
  });

  return enrollment;
};

const ensureProgressSkeleton = async (studentId: string, courseId: string) => {
  const enrollment = await Enrollment.findOne({ student: studentId, course: courseId });
  if (!enrollment) return null;

  const lessons = await Lesson.find({ course: courseId }).select("_id").lean();
  const existingLessonIds = new Set(enrollment.lessonsProgress.map(lp => String(lp.lesson)));
  const toAddLessons = lessons.filter(l => !existingLessonIds.has(String(l._id)));

  const topics = await Topic.find({ lesson: { $in: lessons.map(l => l._id) } }).select("_id").lean();
  const existingTopicIds = new Set(enrollment.topicsProgress.map(tp => String(tp.topic)));
  const toAddTopics = topics.filter(t => !existingTopicIds.has(String(t._id)));

  if (toAddLessons.length) {
    enrollment.lessonsProgress.push(...toAddLessons.map(l => ({ lesson: l._id, completed: false })));
  }
  if (toAddTopics.length) {
    enrollment.topicsProgress.push(...toAddTopics.map(t => ({ topic: t._id, completed: false })));
  }
  if (toAddLessons.length || toAddTopics.length) await enrollment.save();
  return enrollment;
};

const getEnrollment = async (studentId: string, courseId: string) => {
  return Enrollment.findOne({ student: studentId, course: courseId }).populate([
    { path: "lessonsProgress.lesson", select: "title" },
    { path: "topicsProgress.topic", select: "title" },
    { path: "course", select: "title description" },
  ]);
};



export const EnrollmentService = {
  enrollInCourse,
  ensureProgressSkeleton,
  getEnrollment,
};