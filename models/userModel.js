import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        maxLength: [30, "name can not exceed 30 characters"]
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
    resetPasswordToken: String,
    resetPasswordDate: Date,
})

// ENCRYPT PASSWORD  
userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

export const UserModel = mongoose.model("Users", userSchema);