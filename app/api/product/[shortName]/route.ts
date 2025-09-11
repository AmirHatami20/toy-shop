import {NextRequest, NextResponse} from "next/server";
import {connectDB} from "@/lib/mongoose";
import Product from "@/lib/models/product";
import {uploadImage} from "@/lib/uploadImage";
import {ProductAttributesType} from "@/types";

export async function GET(
    req: NextRequest,
    {params}: { params: Promise<{ shortName: string }> }
) {
    try {
        await connectDB();
        const {shortName} = await params;

        const product = await Product.findOne({shortName}).populate("category");

        if (!product) {
            return NextResponse.json({error: "محصول پیدا نشد"}, {status: 404});
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json({error: "خطا در گرفتن محصول"}, {status: 500});
    }
}

export async function PUT(
    req: NextRequest,
    {params}: { params: Promise<{ shortName: string }> }
) {
    try {
        await connectDB();
        const {shortName} = await params;

        const formData = await req.formData();
        console.log(formData);

        const title = formData.get("title") as string | null;
        const newShortName = formData.get("shortName") as string | null;
        const description = formData.get("description") as string | null;
        const price = formData.get("price") ? Number(formData.get("price")) : null;
        const stock = formData.get("stock") ? Number(formData.get("stock")) : null;
        const category = formData.get("category") as string | null;
        const discount = formData.get("discount") ? Number(formData.get("discount")) : null;

        const attributes = formData.get("attributes")
            ? JSON.parse(formData.get("attributes") as string)
            : {};

        const imageFiles = formData.getAll("images") as File[];
        const uploadedImages: string[] = [];

        if (imageFiles.length) {
            for (const file of imageFiles) {
                const url = await uploadImage(file);
                uploadedImages.push(url);
            }
        }

        const updateData = {
            ...(title && {title}),
            ...(newShortName && {shortName: newShortName}),
            ...(description && {description}),
            ...(price !== null && {price}),
            ...(stock !== null && {stock}),
            ...(category && {category}),
            ...(discount !== null && {discount}),
            ...(Object.keys(attributes).length > 0 && {attributes}),
            ...(uploadedImages.length > 0 && {images: uploadedImages}),
        };

        const updated = await Product.findOneAndUpdate({shortName}, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return NextResponse.json({error: "محصول پیدا نشد"}, {status: 404});
        }

        return NextResponse.json({message: "محصول آپدیت شد."});
    } catch (error) {
        console.error("PUT Error:", error);
        return NextResponse.json({error: "خطا در ویرایش محصول"}, {status: 500});
    }
}

export async function DELETE(
    req: NextRequest,
    {params}: { params: Promise<{ shortName: string }> }
) {
    try {
        await connectDB();
        const {shortName} = await params;

        const deleted = await Product.findOneAndDelete({shortName});

        if (!deleted) {
            return NextResponse.json({error: "محصول پیدا نشد"}, {status: 404});
        }

        return NextResponse.json({message: "محصول حذف شد"});
    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json({error: "خطا در حذف محصول"}, {status: 500});
    }
}
