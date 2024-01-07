import nodemailer from "nodemailer";


export const sendEamil = async (emailOp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
        })
    } catch (error) {
        
    }
}