import ErrorHandler from "../utils/errorHandlerClass.js";

export const errorHandler = (err, req, res, next) => {
    err.message = err.message || "Internal server error";
    err.errorCode = err.errorCode || 500;

    // for cast Error 
    if(err.name === "CastError") {
        const message = `Resourse not found. Invalide ${err.path}`
        err = new ErrorHandler(message, 400);
    }


    // // for validation error 
    // if(err.name === "ValidationError") {
    //     console.log("validation")
    //     console.log(err)
    // }
    res.status(err.errorCode).json({
        success: false,
        message: err.message,
    })
}