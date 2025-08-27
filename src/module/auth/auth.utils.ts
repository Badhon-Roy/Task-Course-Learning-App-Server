import jwt, { SignOptions } from 'jsonwebtoken';
import { Types } from 'mongoose';

export type Payload = {
    email: string | undefined;
    role: "student" | "teacher" | undefined;
    id: Types.ObjectId | undefined;
}

// Function to create a token
export const createToken = (
    jwtPayload: Payload,
    secret: string,
    expiresIn: any,
): string => {
    const options: SignOptions = {
        expiresIn, // 'expiresIn' should be either a string or number.
    };

    return jwt.sign(jwtPayload, secret, options);
};