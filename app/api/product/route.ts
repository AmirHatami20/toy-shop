import {NextRequest, NextResponse} from "next/server";
import {connectDB} from "@/lib/mongoose";
import Product from "@/lib/models/product";
import "@/lib/models/category";
import {uploadImage} from "@/lib/uploadImage";

interface ProductFilter {
    title?: { $regex: string; $options: string };
    category?: string;
}

type SortField = "newest" | "price_asc" | "price_desc" | "discount_desc" | "bestseller";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        const title = formData.get("title") as string;
        const shortName = formData.get("shortName") as string;
        const description = formData.get("description") as string | null;
        const price = Number(formData.get("price"));
        const stock = Number(formData.get("stock") || 0);
        const category = formData.get("category") as string;
        const discount = Number(formData.get("discount") || 0);

        if (!title || !shortName || !price || !category) {
            return NextResponse.json({error: "نام محصول, نام کوتاه, قیمت و دسته بندی الزامی هستند."}, {status: 400});
        }

        const imageFiles = formData.getAll("images") as File[];
        if (!imageFiles.length) {
            return NextResponse.json({error: "حداقل یک تصویر الزامی است"}, {status: 400});
        }

        const uploadedImages: string[] = [];
        for (const file of imageFiles) {
            const url = await uploadImage(file);
            uploadedImages.push(url);
        }

        const attributes = formData.get("attributes")
            ? JSON.parse(formData.get("attributes") as string)
            : {};


        const newProduct = await Product.create({
            title,
            shortName,
            description,
            price,
            stock,
            discount,
            images: uploadedImages,
            category,
            attributes,
        });

        return NextResponse.json(newProduct, {status: 201});
    } catch (error) {
        console.error("Create Product error:", error);
        return NextResponse.json({error: "مشکلی پیش آمده است."}, {status: 500});
    }
}

export async function GET(req: NextRequest) {
    await connectDB();

    const {searchParams} = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || null;
    const sort = (searchParams.get("sort") as SortField) || "newest";

    const filter: ProductFilter = {};
    if (search) filter.title = {$regex: search, $options: "i"};
    if (category) filter.category = category;

    const skip = (page - 1) * limit;

    const sortOptions: Record<SortField, Record<string, 1 | -1>> = {
        newest: {createdAt: -1},
        price_asc: {finalPrice: 1},
        price_desc: {finalPrice: -1},
        discount_desc: {discount: -1},
        bestseller: {totalSells: -1}
    };

    const sortQuery = sortOptions[sort] || sortOptions["newest"];

    const products = await Product.find(filter)
        .populate("category")
        .sort(sortQuery)
        .skip(skip)
        .limit(limit);

    const total = await Product.countDocuments(filter);

    return NextResponse.json({
        products,
        pagination: {
            total,
            page,
            pages: Math.ceil(total / limit)
        }
    });
}

