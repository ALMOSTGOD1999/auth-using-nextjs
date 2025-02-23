import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody
        
        console.log(reqBody);

        const user = await User.findOne({ email })
        
        if (user) {
            return NextResponse.json({error: "User already exixsts"},{status:400}, )
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //create a new user
        const newUser = new user({ username, email, password })
        
        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification mail 
        //  await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User created successfully.",
            success: true,
            savedUser
        })
        
        
        
    } catch (error:any) {
     return NextResponse.json({error:error.message},{status:400})      
    }

    
}