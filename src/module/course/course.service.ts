import { ICourse } from "./course.interface";
import Course from "./course.model";

// course create into the database
const createCourseIntoDB = async(course: ICourse)=>{
    const result = await Course.create(course);
    return result;
}

// get all courses from the database
const getAllCoursesFromDB = async()=>{
    const result = await Course.find().populate('teacher');
    return result;
}

// update a course by id
const updateCourseById = async(id: string, course: Partial<ICourse>)=>{
    const result = await Course.findByIdAndUpdate(id, course, { new: true });
    return result;
}

// delete a course by id
const deleteCourseById = async(id: string)=>{
    const result = await Course.findByIdAndDelete(id);
    return result;
}


export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    updateCourseById,
    deleteCourseById
}