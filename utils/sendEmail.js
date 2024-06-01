import nodemailer from "nodemailer";


export const sendEamil = async (emailOp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })

        const mailOption = {
            from: process.env.SMTP_USER,
            to: emailOp.email,
            subject: emailOp.subject,
            text: emailOp.message
        }
        await transporter.sendMail(mailOption);
    } catch (error) {
        return error;
    }
}