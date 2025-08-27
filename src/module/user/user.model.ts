import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<IUser, UserModel>({
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
    followingTeachers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
},
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    const user = this as any;
    if (!user.password) {
        return next();
    };

    // hashing the password
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    )
    next();
})

// userSchema.post('save', function (doc, next) {
//     doc.password = '';
//     next();
// });

userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await User.findOne({ email })
}

userSchema.statics.isPasswordMatched = async function (plainTextPassword,
    hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
}



const User = model<IUser, UserModel>('User', userSchema);
export default User;