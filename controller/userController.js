import { UserModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandlerClass.js";
import crypto from "crypto";

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
        const { email } = req.body;
        const user = await UserModel.findOne({ email });
        // CHECK IF USER EXIST 
        if(!user) {
            return next(new ErrorHandler("user not exist", 404));
        }

    try {
        const resetToken = user.getResetPasswordToken();
        await user.save();
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
        user.resetPasswordToken = undefined;
        user.resetTokenExpire = undefined;
        await user.save();
        next(error);
    }
}


// RESET PASSWORD 
export const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const encryptedToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await UserModel.findOne({
            resetPasswordToken: encryptedToken,
            resetTokenExpire: {$gt: Date.now()}
        });
        // IF USER NOT FOUND 
        if(!user) {
            return next(new ErrorHandler("invalid reset token or reset token has expired", 400)); 
        }

        // IF PASSWORD AND CONFIRM PASSWORD NOT MATCHED 
        if(req.body.password !== req.body.confirmPassword) {
            return next(new ErrorHandler("password and confirmPassword do not match", 400));
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetTokenExpire = undefined;
        await user.save();
        res.json({
            success: true,
            message: "password changed successfully",
        })
    } catch (error) {
        next(error);
    }
}

// CHANGE PASSWORD 
export const changePassword = async (req, res, next) => {
    try {
        const { originalPassword, newPassword, confirmPassword } = req.body;
        const user = await UserModel.findById(req.user._id).select("+password");
        if(!user) {
            return next(new ErrorHandler("user not found", 400));
        }
        // FIRST CHECK IF THE NEW PASSWORD AND CONFIRST PASSWORD ARE CORRECT BEFORE CHECKING THE ORIGINAL PASSWORD 
        if(newPassword !== confirmPassword) {
            return next(new ErrorHandler("Check new password and confirm password", 400));
        }
        // CHECK THE ORIGINAL PASSWORD 
        if(!await bcrypt.compare(originalPassword, user.password)) {
            return next(new ErrorHandler("Invalid credentials", 400));
        }

        // NOW CHANGE THE PASSWORD  
        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "password changed successfully"
        })
    } catch (error) {
        next(error);
    }
}


// GET ALL USER (--Admin)
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find();
        if(!users) {
            return next(new ErrorHandler("users not found", 400));
        }
        res.status(200).json({
            success: true,
            users,
        })
    } catch (error) {
        next(error);
    }
} 


// GET SINGLE USER (--Admin) 
export const getSingleUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await UserModel.findById(id);
        if(!user) {
            return next(new ErrorHandler("user not found", 400));
        }

        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        next(error);
    }
}


// UPDATE USER  (--Admin)
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByIdAndUpdate(id,req.body);
        if(!user) {
            return next(new ErrorHandler("user update request failed, check the id and req.body", 400))
        }
        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        next(error);
    }
}


// DELETE USER (--Admin) 
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByIdAndDelete(id);
        if(!user) {
            return next(new ErrorHandler("user not found", 400));
        }
        res.status(200).json({
            success: true,
            message: "user delete",
            user
        })
    } catch (error) {
        next(error);
    }
}
