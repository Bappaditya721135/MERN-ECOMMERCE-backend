export const errorHandler = (err, req, res, next) => {
    err.message = err.message || "Internal server error";
    err.errorCode = err.errorCode || 500;
    res.status(err.errorCode).json({
        success: false,
        message: err.message,
    })
}