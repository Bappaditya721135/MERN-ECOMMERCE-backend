import jwt from "jsonwebtoken";


export const sendCookie = (user, statusCode, res) => {
    const cookieOption = {
        httpOnly: true,
        maxAge: process.env.MAX_AGE,
        sameSite: "none",
        secure: true,
        credentials: true,
    }

    const token = user.getJWTToken();
    res.status(statusCode).cookie("token", token, cookieOption).json({
        success: true,
        user,
        token
    })
}