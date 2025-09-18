import {connectDB} from "@/lib/mongoose";
import {NextRequest, NextResponse} from "next/server";
import User from "@/lib/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const {name, email, password} = await req.json();

        const existingUser = await User.findOne({email});

        if (existingUser) {
            return NextResponse.json({error: "این ایمیل قبلاً ثبت شده است."}, {status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return NextResponse.json({status: 201});
    } catch {
        return NextResponse.json({error: "مشکلی در ثبت‌نام پیش آمده است."}, {status: 500});
    }
}
