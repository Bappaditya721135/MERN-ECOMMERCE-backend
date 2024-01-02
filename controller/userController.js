import { UserModel } from "../models/userModel.js";

// USER REGISTATION 
export const registerUser = async (req, res, next) => {
    try {
        const user = await UserModel.create(req.body);
        console.log(user);        
        res.status(201).json({success: true})
    } catch (error) {
        next(error)
    }
}