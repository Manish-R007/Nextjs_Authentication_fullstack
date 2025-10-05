import { connect } from "@/dbConfig/dbconfig";
import User from '@/models/userModels'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = await reqBody

        if (!email || !password) {
            return NextResponse.json({ message: "Please fill all the fields" }, { status: 400 })
        }

        const user = await User.findOne({email})
        if (!user) {
            return NextResponse.json({ message: "User not found, please signup" }, { status: 404 })
        }

        const isPasswordCorrect = await bcryptjs.compare(password,user.password)

        if(!isPasswordCorrect){
            return NextResponse.json({ message: "Invalid credentials" }, { status: 400 })
        }
        
        const tokenData = {
            email: user.email,
            id: user._id,
            username: user.username
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })

        const response = NextResponse.json(
            { message: "Login successful", 
              success : true,
             },
        )

        response.cookies.set("token", token , {httpOnly: true})

        return response
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 })
    }
}