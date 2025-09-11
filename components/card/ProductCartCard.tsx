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
    const [isDeleting, setIsDeleting] = useState(false);

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

    // فانکشن جدا برای حذف آیتم با toast
    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteCartItem.mutateAsync(item.product._id as string);
            toast.success("محصول از سبد خرید حذف شد");
        } catch (error) {
            console.error(error);
            toast.error("خطا در حذف محصول");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 p-4 border-b border-gray-200">
            {/* تصویر و اطلاعات محصول */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-y-3 gap-x-5 flex-1">
                <Link href={`/product/${item.product.shortName}`}>
                    <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="sm:h-22 rounded-xl w-full sm:w-auto"
                    />
                </Link>
                <div className="flex flex-col gap-y-1">
                    <Link href={`/product/${item.product.shortName}`} className="font-semibold">
                        {item.product.title}
                    </Link>
                    <div className="flex gap-x-2 items-center text-sm">
                        {item.product?.discount ? (
                            <span className="text-gray-400 line-through">
                                {item.product.price?.toLocaleString("fa-IR")} تومان
                            </span>
                        ) : null}
                        <span className="font-semibold">
                            {item.product.finalPrice?.toLocaleString("fa-IR")} تومان
                        </span>
                    </div>
                </div>
            </div>

            {/* کنترل تعداد */}
            <div className="flex items-center gap-2 mt-3 sm:mt-0">
                <button
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                    onClick={handleDecrease}
                    disabled={updateQuantity.isPending}
                >
                    -
                </button>

                {!updateQuantity.isPending ? (
                    <input
                        type="text"
                        value={inputValue.toLocaleString("fa-IR")}
                        onChange={handleChangeQuantity}
                        onBlur={handleBlur}
                        className="w-14 text-center border border-gray-300 rounded py-1"
                    />
                ) : (
                    <div className="w-14 h-8 flex items-center justify-center border border-gray-300 rounded py-1">
                        <div className="w-4 h-4 border-2 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
                    </div>
                )}

                <button
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                    onClick={handleIncrease}
                    disabled={updateQuantity.isPending}
                >
                    +
                </button>
            </div>

            {/* جمع مبلغ */}
            <div className="hidden sm:flex font-semibold text-lg text-primary-dark">
                {(inputValue * item.product.finalPrice).toLocaleString("fa-IR")} تومان
            </div>

            {/* حذف آیتم با toast و spinner */}
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`text-red-500 bg-gray-200 shadow w-8 h-8 flex items-center justify-center rounded-full transition 
                            hover:bg-gray-400 ${isDeleting ? "cursor-not-allowed" : ""}`}
            >
                {isDeleting ? (
                    <div className="w-4 h-4 border-2 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
                ) : (
                    <GoTrash size={15}/>
                )}
            </button>
        </div>
    );
}
