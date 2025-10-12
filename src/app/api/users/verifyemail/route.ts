import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbconfig";

connect();

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    // Find user with matching token and valid expiry
    const user = await User.findOne({
      verifyToken : token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    const isValid = await bcryptjs.compare(user._id.toString(), token);
    if (!isValid) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: "Email verified successfully" });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
