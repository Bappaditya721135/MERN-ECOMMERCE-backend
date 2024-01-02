import express from "express";
// CONTROLLERS 
import { loginUser, registerUser } from "../controller/userController.js";

const userRouter = express.Router()


userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)


export { userRouter }