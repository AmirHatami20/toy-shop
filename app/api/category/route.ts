import Category from "@/lib/models/category";
import {connectDB} from "@/lib/mongoose";
import {NextRequest, NextResponse} from "next/server";

// CREATE
export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const newCategory = await Category.create(body);

        return NextResponse.json(newCategory, {status: 201});
    } catch (error) {
        console.error("POST Category Error:", error);
        return NextResponse.json({error: "خطا در ایجاد دسته‌بندی"}, {status: 500});
    }
}

// READ
export async function GET() {
    try {
        await connectDB();

        const categories = await Category.find();
        return NextResponse.json(categories);
    } catch (error) {
        console.error("GET Category Error:", error);
        return NextResponse.json({error: "خطا در دریافت دسته‌بندی‌ها"}, {status: 500});
    }
}

