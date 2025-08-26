import { IUser } from "./user.interface";
import User from "./user.model";


// user create into the database
const createUserIntoDB = async(user: IUser) =>{
    const result = User.create(user);
    return result;
}

export const UserServices = {
    createUserIntoDB,
}