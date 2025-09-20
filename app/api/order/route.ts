import {NextRequest, NextResponse} from "next/server";
import {connectDB} from "@/lib/mongoose";
import {auth} from "@/auth";
import {CreateOrderBody} from "@/types";
import Order from "@/lib/models/order";
import Cart from "@/lib/models/cart";


export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const {searchParams} = new URL(req.url);

        const userId = searchParams.get("userId");

        let orders;

        if (userId) {
            orders = await Order.find({userId}).sort({createdAt: -1});
        } else {
            orders = await Order.find().sort({createdAt: -1});
        }

        return NextResponse.json(orders, {status: 200});
    } catch (error) {
        console.error("GET /cart error:", error);
        return NextResponse.json({error: "خطا در گرفتن سفارش."}, {status: 500});
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({error: "کاربر یافت نشد."}, {status: 401});
        }

        const data: CreateOrderBody = await req.json()

        if (!data.userId || !data.items || !data.shippingAddress) {
            return NextResponse.json({error: "اطلاعات سفارش ناقص است"}, {status: 400});
        }

        const totalPrice = data.items.reduce(
            (acc, item) => acc + item.quantity * item.finalPrice,
            0
        );

        const newOrder = await Order.create({...data, totalPrice});

        await Cart.findOneAndDelete({ user: session.user.id });

        return NextResponse.json(newOrder, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "خطا در ثبت خرید."}, {status: 500});
    }

}