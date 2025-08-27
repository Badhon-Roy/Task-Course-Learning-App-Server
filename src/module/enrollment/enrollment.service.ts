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

const markLessonCompleted = async (studentId: string, courseId: string, lessonId: string) => {
  // add skeleton entry if missing, then set completed
  await Enrollment.updateOne(
    { student: studentId, course: courseId, "lessonsProgress.lesson": { $ne: lessonId } },
    { $push: { lessonsProgress: { lesson: new Types.ObjectId(lessonId), completed: false } } }
  );

  const updated = await Enrollment.findOneAndUpdate(
    { student: studentId, course: courseId, "lessonsProgress.lesson": lessonId },
    { $set: { "lessonsProgress.$.completed": true, "lessonsProgress.$.completedAt": new Date() } },
    { new: true }
  );

  return updated;
};

const markTopicCompleted = async (studentId: string, courseId: string, topicId: string) => {
  await Enrollment.updateOne(
    { student: studentId, course: courseId, "topicsProgress.topic": { $ne: topicId } },
    { $push: { topicsProgress: { topic: new Types.ObjectId(topicId), completed: false } } }
  );

  const updated = await Enrollment.findOneAndUpdate(
    { student: studentId, course: courseId, "topicsProgress.topic": topicId },
    { $set: { "topicsProgress.$.completed": true, "topicsProgress.$.completedAt": new Date() } },
    { new: true }
  );

  return updated;
};

const getEnrollment = async (studentId: string, courseId: string) => {
  return Enrollment.findOne({ student: studentId, course: courseId }).populate([
    { path: "lessonsProgress.lesson", select: "title" },
    { path: "topicsProgress.topic", select: "title" },
    { path: "course", select: "title description" },
  ]);
};

const getProgressSummary = async (studentId: string, courseId: string) => {
  const enr = await Enrollment.findOne({ student: studentId, course: courseId }).lean();
  if (!enr) return null;

  const lessonTotal = enr.lessonsProgress.length || 0;
  const lessonDone = enr.lessonsProgress.filter((l: any) => l.completed).length;
  const topicTotal = enr.topicsProgress.length || 0;
  const topicDone = enr.topicsProgress.filter((t: any) => t.completed).length;

  const overallTotal = lessonTotal + topicTotal;
  const overallDone = lessonDone + topicDone;

  return {
    lesson: { completed: lessonDone, total: lessonTotal, percentage: lessonTotal ? Math.round((lessonDone / lessonTotal) * 100) : 0 },
    topic: { completed: topicDone, total: topicTotal, percentage: topicTotal ? Math.round((topicDone / topicTotal) * 100) : 0 },
    overall: { completed: overallDone, total: overallTotal, percentage: overallTotal ? Math.round((overallDone / overallTotal) * 100) : 0 },
  };
};

export const EnrollmentService = {
  enrollInCourse,
  ensureProgressSkeleton,
  markLessonCompleted,
  markTopicCompleted,
  getEnrollment,
  getProgressSummary,
};