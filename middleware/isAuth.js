import ErrorHandler from "../utils/errorHandlerClass.js";

export const isAuthenticated = (req, res, next) => {
    try {
       const { token } = req.cookies;
       if(!token) {
        return next(new ErrorHandler("please login first", 403));
       }
       next();
    } catch (error) {
        next(error)
    }
}