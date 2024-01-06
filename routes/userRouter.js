import express from "express";
// CONTROLLERS 
import { loginUser, logoutUser, registerUser, forgotPassword, resetPassword } from "../controller/userController.js";

const userRouter = express.Router();

// USER REGISTRATION 
userRouter.route("/register").post(registerUser);
// USER LOGIN 
userRouter.route("/login").post(loginUser);
// USER LOGOUT  
userRouter.route("/logout").get(logoutUser);
// FORGOT PASSWORD 
userRouter.route("/forgot-password").post(forgotPassword);
// RESET PASSWORD 
userRouter.route("/reset-password/:token").post(resetPassword);


export { userRouter }