import { Types } from "mongoose";
import { ICourse } from "./course.interface";
import Course from "./course.model";
import AppError from "../../errors/AppError";
import Enrollment from "../enrollment/enrollment.model";
import QueryBuilder from "../../builder/QueryBuilder";

// course create into the database
const createCourseIntoDB = async (course: ICourse) => {
  const result = await Course.create(course);
  return result;
}

// get all courses from the database
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {

  const courseQuery = new QueryBuilder(Course.find(), query)
    .search(['title'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery
    .populate('teacher', "name email")
    .populate('likedBy', "name email")
    .populate('feedbacks.student', "name email")
    .populate('followers', "name email");

  const meta = await courseQuery.countTotal();
  return {
    meta,
    result
  };
}

// get single course by id
const getCourseById = async (courseId: string) => {
  const result = await Course.findById(courseId)
    .populate('teacher', "name email")
    .populate('likedBy', "name email")
    .populate('feedbacks.student', "name email")
    .populate('followers', "name email");
  return result;
};

// update a course by id
const updateCourseById = async (id: string, course: Partial<ICourse>) => {
  const result = await Course.findByIdAndUpdate(id, course, { new: true });
  return result;
}

// delete a course by id
const deleteCourseById = async (id: string) => {
  const result = await Course.findByIdAndDelete(id);
  return result;
}

// Increment course view
const incrementCourseView = async (courseId: string) => {
  return Course.findByIdAndUpdate(courseId,
    { $inc: { views: 1 } },
    { new: true }
  );
};

// Like a course (prevent duplicate likes)
const likeCourse = async (courseId: string, studentId: string) => {
  const course = await Course.findById(courseId);
  if (!course) throw new AppError(404, "Course not found");

  const studentObjectId = new Types.ObjectId(studentId) as any;

  if (!course.likedBy.includes(studentObjectId)) {
    course.likes += 1;
    course.likedBy.push(studentObjectId);
    await course.save();
  }

  return course;
};

// Add feedback
const addCourseFeedback = async (courseId: string, studentId: string, comment: string) => {
  const feedback = { student: new Types.ObjectId(studentId), comment };
  return Course.findByIdAndUpdate(
    courseId,
    { $push: { feedbacks: feedback } },
    { new: true }
  ).populate("feedbacks.student", "name email");
};

// Get analytics for teacher
const getCourseAnalytics = async (teacherId: string) => {
  const courses = await Course.find({ teacher: teacherId }).populate("feedbacks.student", "name email");

  return courses.map(course => ({
    id: course._id,
    title: course.title,
    views: course.views,
    likes: course.likes,
    feedbackCount: course.feedbacks.length,
    feedbacks: course.feedbacks.map(f => ({
      student: f.student,
      comment: f.comment,
    })),
  }));
};


// Follow a course
const followCourse = async (courseId: string, studentId: string) => {
  const course = await Course.findById(courseId);
  if (!course) throw new AppError(404, "Course not found");

  const studentObjectId = new Types.ObjectId(studentId);

  if (!course.followers.includes(studentObjectId)) {
    course.followers.push(studentObjectId);
    await course.save();
  }

  return course;
};

// Get students following a course
const getCourseFollowers = async (courseId: string) => {
  return Course.findById(courseId).populate("followers", "name email");
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


const getProgressSummary = async (studentId: string, courseId: string) => {
  const enr = await Enrollment.findOne({ student: studentId, course: courseId }).lean();
  if (!enr) return null;
  console.log(enr);

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




export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  incrementCourseView,
  likeCourse,
  addCourseFeedback,
  getCourseAnalytics,
  followCourse,
  getCourseFollowers,
  markLessonCompleted,
  markTopicCompleted,
  getProgressSummary
}