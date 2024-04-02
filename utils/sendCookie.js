import jwt from "jsonwebtoken";


export const sendCookie = (user, statusCode, res) => {
    const cookieValidity = process.env.COOKIE_VALIDITY * 24 * 60 * 60 * 1000;
    const cookieOption = {
        httpOnly: true,
        maxAge: cookieValidity,
        sameSite: true,

    }

    const token = user.getJWTToken();
    res.status(statusCode).cookie("token", token, cookieOption).json({
        success: true,
        user,
        token
    })
}