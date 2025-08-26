import { Types } from "mongoose";
import { ICourse } from "./course.interface";
import Course from "./course.model";

// course create into the database
const createCourseIntoDB = async (course: ICourse) => {
    const result = await Course.create(course);
    return result;
}

// get all courses from the database
const getAllCoursesFromDB = async () => {
    const result = await Course.find().populate('teacher').populate('likedBy', "name email").populate('feedbacks.student', "name email");
    return result;
}

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
  if (!course) throw new Error("Course not found");

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



export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    updateCourseById,
    deleteCourseById,
    incrementCourseView,
    likeCourse,
    addCourseFeedback,
    getCourseAnalytics,
}