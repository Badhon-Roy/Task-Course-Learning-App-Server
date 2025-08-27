import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { IUserRole } from "../module/user/user.interface";
import AppError from "../errors/AppError";
import User from "../module/user/user.model";


const auth = (...requiredRoles: IUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError(401, 'You are not authorized!');
        }

        let decoded;
        // verify token
        try {
            decoded = jwt.verify(
                token,
                config.jwt_access_token_secret as string,
            ) as JwtPayload;
        } catch (error) {
            console.log(error);
            throw new AppError(401, 'Unauthorized');
        }

        const { role, email } = decoded;
        const isExistsUser = await User.isUserExistsByEmail(email);
        if (!isExistsUser) {
            throw new AppError(404, 'User is not found!');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(401, 'You are not authorized!');
        }

        req.user = decoded as JwtPayload;
        next();
    })
}
export default auth;