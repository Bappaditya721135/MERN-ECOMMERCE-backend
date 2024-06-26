import ErrorHandler from "../utils/errorHandlerClass.js";
import { UserModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
       const { authToken } = req.cookies;
       console.log(authToken)
       if(!authToken) {
        return next(new ErrorHandler("please login first", 403));
       }
    //    req.user = await
    const decodeToken = jwt.verify(authToken, process.env.JWT_SECRECT_KEY);
    req.user = await UserModel.findById(decodeToken.id);
       next();
    } catch (error) {
        next(error);
    }
}