import { connect } from "@/dbConfig/dbconfig";
import User from '@/models/userModels'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendMail } from "@/helpers/mailer";

connect()

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const {username,email,password} = reqBody

        if(!username || !email || !password){
            return NextResponse.json({message : "All fields are required"}, {status : 400})
        }

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({message : "User already exists Please login"}, {status : 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User(
            {
                username,
                email,
                password : hashedPassword

            }
        )

        const savedUser = await newUser.save()

        // send verification email
        await sendMail({email, emailType : "VERIFY", userId : savedUser._id})

        return NextResponse.json({
            message : "User created successfully",
            savedUser,
            status: 200
        })

    } catch (error : any) {
        return NextResponse.json({message : error.message}, {status : 500})
    }
}