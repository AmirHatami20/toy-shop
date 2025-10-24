'use client';

import React from 'react';
import {ProductCartItem, UserType} from "@/types";
import {useGetCart} from "@/hooks/useCart";
import {useGuestCart} from "@/context/GuestCartContext";
import Loader from "@/components/Loader";
import Link from "next/link";
import {PiBasketBold} from "react-icons/pi";
import ProductCartCard from "@/components/card/ProductCartCard";
import {IoWalletOutline} from "react-icons/io5";

interface Props {
    user: UserType | null;
}

export default function CartLayout({user}: Props) {
    const {data: userCart, isLoading} = useGetCart();
    const guestCartContext = useGuestCart();

    const cartItems: ProductCartItem[] = user ? userCart?.items ?? [] : guestCartContext.items;

    const {basketTotal, basketDiscount, payable} = cartItems.reduce(
        (acc, item) => {
            const price = item.product.price ?? 0;
            const finalPrice = item.product.finalPrice ?? price;
            const qty = item.quantity ?? 0;

            const total = price * qty;
            const discount = (price - finalPrice) * qty;

            acc.basketTotal += total;
            acc.basketDiscount += discount;
            acc.payable += total - discount;

            return acc;
        },
        {basketTotal: 0, basketDiscount: 0, payable: 0}
    );

    // const basketTotal = cartItems.reduce((acc, item) => {
    //     const price = item.product.price ?? 0;
    //     const qty = item.quantity ?? 0;
    //     return acc + price * qty;
    // }, 0);

    // const basketDiscount = cartItems.reduce((acc, item) => {
    //     const price = item.product.price ?? 0;
    //     const finalPrice = item.product.finalPrice ?? price;
    //     const qty = item.quantity ?? 0;
    //     const discount = (price - finalPrice) * qty;
    //     return acc + discount;
    // }, 0);

    // const payable = cartItems.reduce((acc, item) => {
    //     const price = item.product.price ?? 0;
    //     const finalPrice = item.product.finalPrice ?? price;
    //     const qty = item.quantity ?? 0;
    //     const discount = (price - finalPrice) * qty;
    //     return acc + (price * qty - discount);
    // }, 0);

    if (user && isLoading) {
        return (
            <main className="container my-12 flex justify-center">
                <Loader/>
            </main>
        );
    }

    if (!isLoading && cartItems.length === 0) {
        return (
            <main className="container my-12">
                <section className="flex flex-col gap-4 items-center justify-center bg-white shadow rounded-md p-6">
                    <p>سبد خرید شما خالی است</p>
                    <Link href="/products">
                        <button className="primary-button">لیست محصولات</button>
                    </Link>
                </section>
            </main>
        );
    }

    const checkoutHref = user ? "/checkout" : "/login";
    const checkoutLabel = user ? "پرداخت و تکمیل خرید" : "ورود برای ادامه خرید";
    return (
        <main className="container my-12">
            <section className="grid grid-cols-12 gap-y-5 gap-6 lg:gap-x-7">
                {/* لیست محصولات */}
                <div className="col-span-full lg:col-span-8 rounded-md overflow-hidden bg-white shadow">
                    <div className="flex items-center gap-x-2 px-4 h-14 bg-primary text-white">
                        <PiBasketBold size={30}/>
                        <span className="font-bold text-lg md:text-xl">سبد خرید</span>
                    </div>
                    <div className="flex flex-col p-4 gap-2">
                        {cartItems.map(item => (
                            <ProductCartCard key={item.product._id} item={item}/>
                        ))}
                    </div>
                </div>

                {/* اطلاعات پرداخت */}
                <div className="col-span-full lg:col-span-4 rounded-md overflow-hidden h-fit bg-white shadow">
                    <div className="flex items-center gap-x-2 px-4 h-14 bg-primary text-white">
                        <IoWalletOutline size={30}/>
                        <span className="font-bold text-lg md:text-xl">اطلاعات پرداخت</span>
                    </div>
                    <div className="flex flex-col p-4 gap-4">
                        <div className="flex justify-between items-center text-sm md:text-base font-semibold">
                            <span>جمع کل:</span>
                            <span>{basketTotal.toLocaleString("fa-IR")} تومان</span>
                        </div>

                        <div
                            className="flex justify-between items-center text-sm md:text-base text-green-600 font-semibold"
                        >
                            <span>تخفیف:</span>
                            <span>{basketDiscount.toLocaleString("fa-IR")} تومان</span>
                        </div>

                        <div
                            className="flex justify-between items-center text-base md:text-lg border-t border-gray-200 pt-3 mt-2 font-bold">
                            <span>قابل پرداخت:</span>
                            <span>{payable.toLocaleString("fa-IR")} تومان</span>
                        </div>

                        <Link href={checkoutHref}>
                            <button className="mt-4 primary-button w-full">{checkoutLabel}</button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
