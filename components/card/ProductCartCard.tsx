'use client'

import React, {useState} from 'react';
import Link from "next/link";
import {ProductCartItem} from "@/types";
import {useDeleteCartItem, useUpdateCartItem} from "@/hooks/useCart";
import {GoTrash} from "react-icons/go";
import toast from "react-hot-toast";

export default function ProductCartCard({item}: { item: ProductCartItem }) {
    const updateQuantity = useUpdateCartItem();
    const deleteCartItem = useDeleteCartItem();
    const [inputValue, setInputValue] = useState(item.quantity);

    const handleIncrease = () => {
        const newQty = inputValue + 1;
        setInputValue(newQty);
        updateQuantity.mutate({productId: item.product._id as string, quantity: newQty});
    };

    const handleDecrease = () => {
        if (inputValue > 1) {
            const newQty = inputValue - 1;
            setInputValue(newQty);
            updateQuantity.mutate({productId: item.product._id as string, quantity: newQty});
        }
    };

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.target.value.replace(/[^0-9]/g, "")) || 1;
        value = Math.max(1, value);
        setInputValue(value);
    };

    const handleBlur = () => {
        updateQuantity.mutate({productId: item.product._id as string, quantity: inputValue});
    };

    const handleDelete = async () => {
        try {
            await deleteCartItem.mutateAsync(item.product._id as string);
            toast.success("محصول از سبد خرید حذف شد");
        } catch (error) {
            console.error(error);
            toast.error("خطا در حذف محصول");
        }
    };

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
                        ) : null
                        }
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
                        <div className="w-10 h-7 flex items-center justify-center bg-gray-200 rounded">
                            <div
                                className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
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
                    {((inputValue * (item.product.finalPrice ?? 0))).toLocaleString("fa-IR")} تومان
                </span>

                <button
                    className="absolute top-2 left-2 sm:top-0 sm:left-0 sm:relative flex justify-center items-center text-sm text-red-500 bg-gray-100 rounded-full w-7 h-7 hover:bg-gray-200 transition border border-gray-300"
                    onClick={handleDelete}
                >
                    {!deleteCartItem.isPending ? (
                        <GoTrash/>
                    ) : (
                        <div
                            className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    )}
                </button>
            </div>
        </div>
    );
}
