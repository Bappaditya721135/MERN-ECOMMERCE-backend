import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import otpGenerator from "otp-generator"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        maxLength: [30, "name can not exceed 30 characters"],
        minLength: [4, "name should have more than 4 charators"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        validate: [validator.isEmail, "enter a valid email"],
        unique: [true, "email already exists"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [8, "password must be of 8 charactors"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    cart: [],
    role: {
        type: String,
        default: "user"
    },
    authToken: String,
    authTokenExpiresInMiliSeconds: Date,
    resetPasswordOtp: String,
    resetOtpExpires: Date,
})

// ENCRYPT PASSWORD  
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// GENERATE TOKEN 
userSchema.methods.getJWTToken = async function(cookie_validity_miliseconds) {
    const token = jwt.sign({id: this._id}, process.env.JWT_SECRECT_KEY);
    this.authToken = token;
    this.authTokenExpiresInMiliSeconds = cookie_validity_miliseconds;
    await this.save();
    return token;
}

// CHECK IF THE ENTERED PASSWORD IS CORRECT 
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

// GET RESET PASSWORD TOKEN 
userSchema.methods.getResetPasswordOtp = async function () {
    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false, 
        lowerCaseAlphabets: false, 
        specialChars: false, 
        digits: true,
    })
    this.resetPasswordOtp = otp;
    this.resetOtpExpires = new Date(Date.now() + 15 * 60 * 1000)
    this.save()
    return otp;
}

export const UserModel = mongoose.model("Users", userSchema);