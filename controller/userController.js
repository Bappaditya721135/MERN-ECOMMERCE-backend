import { UserModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandlerClass.js";

// SEND COOKIE UTILITY FUNCTION 
import { sendCookie } from "../utils/sendCookie.js";

// USER REGISTATION 
export const registerUser = async (req, res, next) => {
    try {
        const user = await UserModel.create(req.body);

        // IF SOMETHING WENT WRONG WHILE CREATING USER IN DATA BASE 
        if(!user) return next(new ErrorHandler("something went wrong while creating the user", 500))

        sendCookie(user, 201, res);
    } catch (error) {
        next(error)
    }
}


// USER LOGIN 
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({email}).select("+password")

        // USER NOT FOUND 
        if(!user) return next(new ErrorHandler("can not find user", 404));

        // CHECK IF THE PASSWORD MATCH 
        const matchPassword = await bcrypt.compare(password, user.password);
        if(!matchPassword) return next(new ErrorHandler("invalid email or password", 400));
        
        // SEND COOKIE 
        sendCookie(user,201, res);
    } catch (error) {
        next(error)
    }
}