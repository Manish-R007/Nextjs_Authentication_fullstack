import { NextRequest , NextResponse } from "next/server";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs"
import { connect } from "@/dbConfig/dbconfig";


connect()

export async function POST(request : NextRequest){
    try {
        const response = await request.json()
        const {token, newPassword} = response
    
        if(!newPassword || !token) {
            return NextResponse.json({
                message : "Token or password is missing",
                success : false,
            })
        }
    
        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordExpiry: { $gt: Date.now() }
        })
         
        if(!user){
            return NextResponse.json({
                message : "Invalid or expired token",
                statuscode: 400
            })
        }
    
        // Remove the bcrypt compare - just use direct token matching
        // since we stored it in plain text
    
        user.password = await bcryptjs.hash(newPassword, 10)
        user.forgotPasswordToken = undefined
        user.forgotPasswordExpiry = undefined
        await user.save()
    
        return NextResponse.json({
            message : "Password changed successfully",
            success : true,
            statuscode: 200
        })
    } catch (error : any) {
        return NextResponse.json({
            message : "Error occurred in changing the password: " + error.message,
            statuscode: 500
        })
    }
}