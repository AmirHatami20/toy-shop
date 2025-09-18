'use client';

import React, {useState} from 'react';
import Link from "next/link";
import {ProductCartItem} from "@/types";
import {useDeleteCartItem, useUpdateCartItem} from "@/hooks/useCart";
import {GoTrash} from "react-icons/go";
import toast from "react-hot-toast";
import {useGuestCart} from "@/context/GuestCartContext";
import {useSession} from "next-auth/react";
import {AxiosError} from "axios";
import Spinner from "@/components/Spinner";

interface Props {
    item: ProductCartItem;
}

export default function ProductCartCard({item}: Props) {
    const {data: session} = useSession();
    const user = session?.user;

    const guestCartContext = useGuestCart();
    const updateQuantity = useUpdateCartItem();
    const deleteCartItem = useDeleteCartItem();

    const [inputValue, setInputValue] = useState(item.quantity);

    const handleUpdateQuantity = (qty: number) => {
        if (user) {
            try {
                updateQuantity.mutate({productId: item.product._id as string, quantity: qty});
            } catch (error) {
                const err = error as AxiosError<{ error?: string }>;
                const message = err.response?.data?.error || "خطایی رخ داده است.";
                toast.error(message);
            }
        } else {
            guestCartContext.updateItem(item.product._id as string, qty);
        }
    };

    const handleIncrease = () => {
        const newQty = inputValue + 1;
        setInputValue(newQty);
        handleUpdateQuantity(newQty);
    };

    const handleDecrease = () => {
        if (inputValue <= 1) return;
        const newQty = inputValue - 1;
        setInputValue(newQty);
        handleUpdateQuantity(newQty);
    };

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.target.value.replace(/[^0-9]/g, "")) || 1;
        value = Math.max(1, value);
        setInputValue(value);
    };

    const handleBlur = () => {
        handleUpdateQuantity(inputValue);
    };

    const handleDelete = () => {
        if (user) {
            try {
                deleteCartItem.mutate(item.product._id as string);
                toast.success("محصول از سبد خرید حذف شد");
            } catch (error) {
                const err = error as AxiosError<{ error?: string }>;
                const message = err.response?.data?.error || "خطایی رخ داده است.";
                toast.error(message);
            }
        } else {
            guestCartContext.removeItem(item.product._id as string);
            toast.success("محصول از سبد خرید حذف شد");
        }
    };

    const totalPrice = (inputValue * (item.product.finalPrice ?? 0)).toLocaleString("fa-IR");

    return (
        <div className="flex flex-col md:flex-row justify-between gap-5 p-2 md:p-4 border-b border-gray-200 relative">
            {/* بخش تصویر و عنوان */}
            <div className="flex items-center flex-col sm:flex-row gap-3">
                <Link href={`/product/${item.product.shortName}`} className="w-full sm:w-auto">
                    <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="h-40 sm:h-24 w-full sm:w-26 object-cover object-top rounded-md"
                    />
                </Link>
                <div className="flex flex-col gap-1.5">
                    <span className="text-lg font-semibold">{item.product.title}</span>
                    <div className="flex gap-x-1 items-center">
                        <span>قیمت:</span>
                        {item.product.discount ? (
                            <span className="text-gray-400 line-through text-[13px] pb-2">
                {item.product.price?.toLocaleString("fa-IR")}
              </span>
                        ) : null}
                        <span className="text-sm text-gray-800">
              {item.product.finalPrice?.toLocaleString("fa-IR")} تومان
            </span>
                    </div>
                </div>
            </div>

            {/* بخش کنترل‌ها */}
            <div className="flex items-center gap-x-3">
                <div className="flex items-center gap-x-1">
                    <button
                        className="flex items-center justify-center h-7 w-7 text-lg bg-gray-100 border border-gray-300 rounded"
                        onClick={handleDecrease}
                    >
                        -
                    </button>

                    {!updateQuantity.isPending ? (
                        <input
                            type="text"
                            className="w-10 h-7 text-center border border-gray-300 outline-none bg-white rounded"
                            max={item.product.stock}
                            min={1}
                            value={inputValue.toLocaleString("fa-IR")}
                            onChange={handleChangeQuantity}
                            onBlur={handleBlur}
                        />
                    ) : (
                        <div className="w-8 h-7 flex items-center justify-center bg-gray-200 rounded">
                            <Spinner size={18}/>
                        </div>
                    )}

                    <button
                        className="flex items-center justify-center h-7 w-7 text-lg bg-gray-100 border border-gray-300 rounded"
                        onClick={handleIncrease}
                    >
                        +
                    </button>
                </div>

                <span className="text-lg font-semibold text-primary-dark">
          {totalPrice} تومان
        </span>

                <button
                    className="absolute top-2 left-2 sm:top-0 sm:left-0 sm:relative flex justify-center items-center text-sm text-red-500 bg-gray-100 rounded-full w-7 h-7 hover:bg-gray-200 transition border border-gray-300"
                    onClick={handleDelete}
                    disabled={deleteCartItem.isPending}
                >
                    {!deleteCartItem.isPending ? <GoTrash/> : <Spinner size={14} color="red" />}
                </button>
            </div>
        </div>
    );
}
