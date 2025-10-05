import { connect } from "@/dbConfig/dbconfig";
import {getDataFromToken} from "@/helpers/getData";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request : NextRequest){
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id : userId}).select("-password")
        return NextResponse.json({
            message : "user found",
            userData : user
        })
    } catch (error : any) {
        return NextResponse.json(
            {
                message : "token invalid",
                
            }
        )
    }
}