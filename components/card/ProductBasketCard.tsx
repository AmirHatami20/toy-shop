'use client'
import React from 'react';
import {ProductCartItem} from '@/types';
import {useDeleteCartItem} from '@/hooks/useCart';
import {GoTrash} from "react-icons/go";
import toast from "react-hot-toast";

export default function ProductBasketCard({item}: { item: ProductCartItem }) {
    const deleteItem = useDeleteCartItem();

    const handleDelete = () => {
        deleteItem.mutate(item.product._id as string);
        toast.success("محصول از سبد خرید شما حذف شد.");
    };
    console.log(item)

    return (
        <div className="flex items-center justify-between px-3 py-3">
            <div className="flex items-center gap-x-3">
                <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex flex-col gap-y-1">
                    <span className="text-sm font-semibold">{item.product.title}</span>
                    <div className="flex gap-x-2">
                        {item.product.discount ? (
                            <span className="text-gray-400 line-through text-[13px] pb-2">
                                {item.product.price?.toLocaleString("fa-IR")}
                            </span>
                        ) : null}
                        <span className="text-sm text-gray-700">
                            {item.product.finalPrice?.toLocaleString("fa-IR")} تومان
                         </span>
                    </div>

                    <span className="text-xs text-gray-500">تعداد: {item.quantity.toLocaleString("fa-IR")}</span>
                </div>
            </div>
            <button
                onClick={handleDelete}
                className="flex items-center justify-center bg-gray-100 rounded-full p-2 text-red-500 text-sm hover:text-red-700"
            >
                <GoTrash/>
            </button>
        </div>
    );
}
