import { UserModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandlerClass.js";

// SEND COOKIE UTILITY FUNCTION 
import { sendCookie } from "../utils/sendCookie.js";
import { sendEamil } from "../utils/sendEmail.js";

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
        if(!email || !password) return next(new ErrorHandler("enter email & password", 400))
        const user = await UserModel.findOne({email}).select("+password")

        // USER NOT FOUND 
        if(!user) return next(new ErrorHandler("can not find user", 404));

        // CHECK IF THE PASSWORD MATCH 
        const isPasswordCorrect = await user.comparePassword(password);
        if(!isPasswordCorrect) return next(new ErrorHandler("invalid email or password", 400));
        
        // SEND COOKIE 
        sendCookie(user,201, res);
    } catch (error) {
        next(error)
    }
}


// LOGOUT USER 
export const logoutUser = (req, res, next) => {
    try {
        res.status(201).cookie(
            "token", null,
             {
                expires: new Date(Date.now())
            }).json({
            success: true,
             message: "logout successfull"
            });
    } catch (error) {
      next(error);  
    }
}


// FORGOR PASSWORD 
export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });
        // CHECK IF USER EXIST 
        if(!user) {
            return next(new ErrorHandler("user not exist", 404));
        }

        const resetToken = user.getResetPasswordToken();
        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/reset-password/${resetToken}`;
        const message = `please reset your password from this url:- ${resetPasswordUrl} if not requested from you ignore it`;
        await sendEamil({
            email: user.email,
            subject: "Ecommerce password reset",
            message,
        })
        res.status(200).json({
            success: true,
            message: `reset token url sent to ${user.email}`
        })
    } catch (error) {
        next(error);
    }
}


// RESET PASSWORD 

export const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        console.log(password);
        console.log(token);
        res.send("reset password"); 
    } catch (error) {
        next(error);
    }
}