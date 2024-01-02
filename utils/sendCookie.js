import jwt from "jsonwebtoken";


export const sendCookie = (user, statusCode, res) => {
    const cookieOption = {
        httpOnly: true,
        maxAge: process.env.MAX_AGE,
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRECT_KEY);
    res.status(statusCode).cookie("token", token, cookieOption).json({
        success: true,
        user,
        token
    })
}