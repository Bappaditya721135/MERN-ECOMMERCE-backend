import express from "express";
// CONTROLLERS
import { loginUser, logoutUser, registerUser, forgotPassword, resetPassword, getAllUsers, getSingleUser, updateUser, deleteUser, changePassword, getUser } from "../controller/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { isAuthorize } from "../middleware/isAuthorize.js";

const userRouter = express.Router();

// USER REGISTRATION
userRouter.route("/register").post(registerUser);
// USER LOGIN
userRouter.route("/login").post(loginUser);
// GET USER
userRouter.route("/user/me").get(isAuthenticated, getUser);
// USER LOGOUT
userRouter.route("/logout").get(logoutUser);
// FORGOT PASSWORD
userRouter.route("/forgot-password").post(forgotPassword);
// RESET PASSWORD
userRouter.route("/reset-password/:token").post(resetPassword);
// CHANGE PASSWORD
userRouter.route("/password/update").put(isAuthenticated, changePassword)

// GET ALL USER FOR (--ADMIN)
userRouter.route("/admin/getallusers").get(isAuthenticated, isAuthorize("admin"), getAllUsers);

// GET SINGLE USER  FOR (--ADMIN)
userRouter.route("/admin/user/:id").get(isAuthenticated, isAuthorize("admin"), getSingleUser);

// UPDATE USER FOR (--Admin)
userRouter.route("/admin/user/update/:id").put(isAuthenticated, isAuthorize("admin"), updateUser);

// DELETE USER FOR (--Admin)
userRouter.route("/admin/user/delete/:id").delete(isAuthenticated, isAuthorize("admin"), deleteUser);


export { userRouter }
