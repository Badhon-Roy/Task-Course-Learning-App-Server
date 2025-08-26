import { ICourse } from "./course.interface";
import Course from "./course.model";

// course create into the database
const createCourseIntoDB = async(course: ICourse)=>{
    const result = await Course.create(course);
    return result;
}

export const CourseServices = {
    createCourseIntoDB,
}