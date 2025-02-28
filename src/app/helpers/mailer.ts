import User from "@/models/userModel"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        //create a hased token
        const hashedToken = await bcrypt.hash(userId.toString(), 10)
        if (emailType==="VERIFY") {
               await User.findByIdAndUpdate(userId, {verifyToken:hashedToken,verifyTokenExpiry:Date.now()+36000})
        }
        else if(emailType==="RESET"){
               await User.findByIdAndUpdate(userId, {forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+36000})
        }
           
        var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "3b6df92d7aa6ed",
            pass: "f30d39664f8271"

            //add these credentials to .env file
        }
        });

        const mailOptions = {
            from: "abc@gmail.com",
            to: email,
            subject: emailType==="VERIFY"? "Verify tour email":"Reset your password"
        }
        
    } catch (error:any ) {
        throw new Error(error.message )
    }   
}  