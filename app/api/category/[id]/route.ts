import {connectDB} from "@/lib/mongoose";
import Category from "@/lib/models/category";
import {NextRequest, NextResponse} from "next/server";
import mongoose from "mongoose";

// DELETE
export async function DELETE(
    req: NextRequest,
    {params}: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const {id} = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({error: "شناسه نامعتبر است"}, {status: 400});
        }

        const deleted = await Category.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({error: "دسته‌بندی پیدا نشد"}, {status: 404});
        }

        return NextResponse.json({message: "دسته‌بندی حذف شد", deleted});
    } catch (error) {
        console.error("DELETE Category Error:", error);
        return NextResponse.json({error: "خطا در حذف دسته‌بندی"}, {status: 500});
    }
}

// UPDATE
export async function PUT(
    req: NextRequest,
    {params}: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const {id} = await params;
        const data = await req.json();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({error: "شناسه نامعتبر است"}, {status: 400});
        }

        const updated = await Category.findByIdAndUpdate(id, data, {new: true});

        if (!updated) {
            return NextResponse.json({error: "دسته‌بندی پیدا نشد"}, {status: 404});
        }

        return NextResponse.json(updated);
    } catch (error) {
        console.error("PUT Category Error:", error);
        return NextResponse.json({error: "خطا در آپدیت دسته‌بندی"}, {status: 500});
    }
}
