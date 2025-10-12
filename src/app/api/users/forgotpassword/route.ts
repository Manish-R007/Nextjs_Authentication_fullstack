import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";


connect()


export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({
        message: "Email is required",
        statuscode: 400,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        statuscode: 404,
      });
    }

    await sendMail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json({
      message: "Reset password link sent to your email",
      statuscode: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      statuscode: 500,
    });
  }
}
