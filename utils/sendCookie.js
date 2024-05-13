import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";


export const sendCookie = async (user, statusCode, res) => {
    const cookieValidity = process.env.COOKIE_VALIDITY * 24 * 60 * 60 * 1000;
    const cookieOption = {
        httpOnly: true,
        maxAge: cookieValidity,
        sameSite: true,

    }

    const authToken = await user.getJWTToken(cookieValidity);
    res.status(statusCode).cookie("authToken", authToken, cookieOption).json({
        success: true,
        user,
        authToken
    })
}



// SEND EXISTING COOKIE 
export const sendExistingCookie =  (user, statusCode, res) => {
    console.log("existing cookie")
    const cookieOption = {
        httpOnly: true,
        maxAge: user.authTokenExpiresInMiliSeconds,
        sameSite: true
    }

    const authToken = user.authToken;
    res.status(statusCode).cookie("authToken", authToken, cookieOption).json({
        success: true,
        user,
        authToken
    })

}