import config from "../../config";
import AppError from "../../errors/AppError";
import User from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";


const loginUser = async (payload: ILoginUser) => {
    // checking if the user is exist
    const user = await User.findOne({ email: payload?.email }).select("+password");

    if (!(await User.isUserExistsByEmail(payload?.email))) {
        throw new AppError(404, "This user is not found !");
    }
    console.log("Plain:", payload?.password);
    console.log("Hashed:", user?.password);

    // match the password
    if (!(await User.isPasswordMatched(payload?.password, user?.password as string))) {
        throw new AppError(403, "Password is incorrect !");
    }

    const jwtPayload = {
        email: user?.email,
        role: user?.role,
        id: user?._id,
    };

    // create access token
    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_token_secret as string,
        config.jwt_access_token_expires_in
    );


    return {
        accessToken
    };
}

export const AuthServices = {
    loginUser,
};