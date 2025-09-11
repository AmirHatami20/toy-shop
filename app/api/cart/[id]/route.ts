import {connectDB} from "@/lib/mongoose";
import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/auth";
import Cart from "@/lib/models/cart";

export async function PUT(
    req: NextRequest,
    {params}: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({message: "کاربر یافت نشد."}, {status: 401});
        }

        const {id: productId} = await params;
        const {quantity} = await req.json();

        const cart = await Cart.findOne({user: session.user.id, status: "active"});
        if (!cart) {
            return NextResponse.json({message: "سبد خرید یافت نشد."}, {status: 404});
        }

        const item = cart.items.find((i: { product: string }) => i.product.toString() === productId);
        if (!item) {
            return NextResponse.json({message: "محصول در سبد خرید یافت نشد."}, {status: 404});
        }

        item.quantity = quantity;
        await cart.save();

        return NextResponse.json({message: "تعداد محصول بروزرسانی شد.", cart});
    } catch (err) {
        console.error("PUT /cart/:id error:", err);
        return NextResponse.json({message: "خطا در بروزرسانی محصول."}, {status: 500});
    }
}

export async function DELETE(
    req: NextRequest,
    {params}: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({message: "کاربر یافت نشد."}, {status: 401});
        }

        const {id: productId} = await params;

        const cart = await Cart.findOne({user: session.user.id, status: "active"});
        if (!cart) {
            return NextResponse.json({message: "سبد خرید یافت نشد."}, {status: 404});
        }

        cart.items = cart.items.filter((item: { product: string }) => item.product.toString() !== productId);
        await cart.save();

        return NextResponse.json({message: "محصول حذف شد.", cart});
    } catch (err) {
        console.error("DELETE /cart/:id error:", err);
        return NextResponse.json({message: "خطا در حذف محصول."}, {status: 500});
    }
}
