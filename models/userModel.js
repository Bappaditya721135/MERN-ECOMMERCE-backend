import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

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
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetTokenExpire: Date,
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
userSchema.methods.getJWTToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRECT_KEY);
}

// CHECK IF THE ENTERED PASSWORD IS CORRECT 
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

// GET RESET PASSWORD TOKEN 
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetTokenExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

export const UserModel = mongoose.model("Users", userSchema);