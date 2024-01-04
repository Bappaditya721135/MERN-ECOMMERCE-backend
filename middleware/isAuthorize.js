import ErrorHandler from "../utils/errorHandlerClass.js";

export const isAuthorize = (...role) => {
    return (req, res, next) => {
        try {
            if(!role.includes(req.user.role)) {
                return next(new ErrorHandler("user not allowed", 403));
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}