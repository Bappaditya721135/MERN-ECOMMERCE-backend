import express from "express";
// CONTROLLERS 
import { registerUser } from "../controller/userController.js";

const userRouter = express.Router()


userRouter.route("/register").post(registerUser)


export { userRouter }