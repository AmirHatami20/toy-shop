import {connectDB} from "@/lib/mongoose";
import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/auth";
import Cart from "@/lib/models/cart";

export async function GET(req: NextRequest) {
    await connectDB();

    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({message: "کاربر یافت نشد."}, {status: 401});
    }

    const cart = await Cart.findOne({
        user: session.user.id,
        status: "active",
    }).populate("items.product");

    return NextResponse.json(cart || {items: []});
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({message: "کاربر یافت نشد."}, {status: 401});
        }

        const {productId, quantity} = await req.json();

        let cart = await Cart.findOne({user: session.user.id, status: "active"});

        if (!cart) {
            cart = await Cart.create({
                user: session.user.id,
                items: [{product: productId, quantity}],
            });
        } else {
            const existingItem = cart.items.find(
                (item: { product: string }) => item.product.toString() === productId
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({product: productId, quantity});
            }

            await cart.save();
        }

        return NextResponse.json({message: "محصول به سبد خرید اضافه شد.", cart});
    } catch (err) {
        console.error("POST /cart error:", err);
        return NextResponse.json({message: "خطا در افزودن محصول به سبد خرید."}, {status: 500});
    }
}
