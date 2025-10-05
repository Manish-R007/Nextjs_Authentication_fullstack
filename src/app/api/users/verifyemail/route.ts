import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModels";
import { NextRequest,NextResponse } from "next/server";


connect()

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);

        const user = await User.findOne({verifyToken : token,
            verifyTokenExpiry : {$gt: Date.now()}
        })
        
        if(!user){
            return NextResponse.json({status:500,
                message :   "User not found "
            })

        }

        console.log(user);

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        return  NextResponse.json({status:  200,
            message : "Email sent successfully created"})

        

    } catch (error: any) {
        return NextResponse.json({
            error : error.message,
            status : 500
        })
    }
}