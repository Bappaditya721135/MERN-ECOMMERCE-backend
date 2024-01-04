import express from "express";
// CONTROLLERS 
import { loginUser, logoutUser, registerUser } from "../controller/userController.js";

const userRouter = express.Router();

// USER REGISTRATION 
userRouter.route("/register").post(registerUser);
// USER LOGIN 
userRouter.route("/login").post(loginUser);
// USER LOGOUT  
userRouter.route("/logout").get(logoutUser);



export { userRouter }