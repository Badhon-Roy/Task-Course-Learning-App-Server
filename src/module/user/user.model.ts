import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import e from "express";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ['student', 'teacher'],
        default: 'student'
    },
},
    { timestamps: true });

const User = model<IUser>('User', userSchema);
export default User;