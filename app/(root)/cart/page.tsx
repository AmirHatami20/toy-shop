'use client'

import React, {useMemo} from 'react';
import {PiBasketBold} from "react-icons/pi";
import {useGetCart} from "@/hooks/useCart";
import {IoWalletOutline} from "react-icons/io5";
import {ProductCartItem} from "@/types";
import ProductCartCard from "@/components/card/ProductCartCard";
import Loader from "@/components/Loader";

export default function Page() {
    const {data: cart, isLoading} = useGetCart();
    const cartProducts = cart?.items;

    const {basketTotal, basketDiscount, payable} = useMemo(() => {
        let total = 0;
        let discount = 0;

        cartProducts?.forEach((item: ProductCartItem) => {
            const price = item.product.price ?? 0;
            const finalPrice = item.product.finalPrice ?? price;
            const qty = item.quantity;

            total += price * qty;
            discount += (price - finalPrice) * qty;
        });

        return {
            basketTotal: total,
            basketDiscount: discount,
            payable: total - discount,
        };
    }, [cartProducts]);

    if (isLoading) {
        return (
            <main className="container my-12 flex justify-center">
                <Loader/>
            </main>
        );
    }

    if (!isLoading && !cartProducts && cartProducts?.length === 0) {
        return (
            <main className="container my-12">
                <section className="bg-white shadow rounded-md p-6 text-center">
                    سبد خرید شما خالی است
                </section>
            </main>
        );
    }

    return (
        <main className="container my-12">
            <section className="grid grid-cols-12 gap-y-5 gap-6 lg:gap-x-7">
                {/* سبد خرید */}
                <div className="col-span-full md:col-span-8 rounded-md overflow-hidden bg-white shadow">
                    <div className="flex items-center gap-x-2 px-4 h-14 bg-primary text-white">
                        <PiBasketBold size={30}/>
                        <span className="font-bold text-lg md:text-xl">سبد خرید</span>
                    </div>
                    <div className="flex flex-col p-4 gap-4">
                        {cartProducts?.map((item: ProductCartItem) => (
                            <ProductCartCard key={item.product._id} item={item}/>
                        ))}
                    </div>
                </div>

                {/* اطلاعات پرداخت */}
                <div className="col-span-full md:col-span-4 rounded-md overflow-hidden bg-white shadow">
                    <div className="flex items-center gap-x-2 px-4 h-14 bg-primary text-white">
                        <IoWalletOutline size={30}/>
                        <span className="font-bold text-lg md:text-xl">اطلاعات پرداخت</span>
                    </div>

                    <div className="flex flex-col p-4 gap-4">
                        <div className="flex justify-between items-center text-sm md:text-base">
                            <span>جمع کل:</span>
                            <span className="font-semibold">{basketTotal.toLocaleString("fa-IR")} تومان</span>
                        </div>

                        {basketDiscount > 0 && (
                            <div className="flex justify-between items-center text-sm md:text-base text-green-600">
                                <span>تخفیف:</span>
                                <span className="font-semibold">{basketDiscount.toLocaleString("fa-IR")} تومان</span>
                            </div>
                        )}

                        <div
                            className="flex justify-between items-center text-base md:text-lg border-t border-gray-200 pt-3 mt-2 font-bold">
                            <span>قابل پرداخت:</span>
                            <span>{payable.toLocaleString("fa-IR")} تومان</span>
                        </div>

                        <button className="mt-4 primary-button">
                            پرداخت و تکمیل خرید
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
