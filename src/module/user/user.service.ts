import { Types } from "mongoose";
import { IUser } from "./user.interface";
import User from "./user.model";
import AppError from "../../errors/AppError";


// user create into the database
const createUserIntoDB = async (user: IUser) => {
    const result = User.create(user);
    return result;
}

// get all users from the database
const getAllUsersFromDB = async () => {
    const result = await User.find().populate("followingTeachers", "name email").populate("followers", "name email");
    return result;
}


const followTeacher = async (studentId: string, teacherId: string) => {
    if (studentId === teacherId) throw new AppError(404, "You cannot follow yourself");

    const student = await User.findById(studentId);
    const teacher = await User.findById(teacherId);

    if (!student || !teacher) throw new AppError(404, "User not found");

    const studentObjId = new Types.ObjectId(studentId);
    const teacherObjId = new Types.ObjectId(teacherId);

    // add teacher to student's followingTeachers
    if (!student.followingTeachers.includes(teacherObjId)) {
        student.followingTeachers.push(teacherObjId);
        await student.save();
    }

    // add student to teacher's followers
    if (!teacher.followers.includes(studentObjId)) {
        teacher.followers.push(studentObjId);
        await teacher.save();
    }

    return { student, teacher };
};

const getTeacherFollowers = async (teacherId: string) => {
    return User.findById(teacherId).populate("followers", "name email");
};




export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    followTeacher,
    getTeacherFollowers
}