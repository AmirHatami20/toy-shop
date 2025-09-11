'use client'

import React from 'react';
import {AiOutlinePlus} from "react-icons/ai";
import Link from "next/link";

import {useGetProducts} from "@/hooks/useProduct"
import ProductCard from "@/components/admin/card/ProductCard";
import {ProductType} from "@/types";

export default function Page() {
    const {data, isLoading} = useGetProducts({});
    const products = data?.products || [];

    return (
        <div className="bg-white p-6 shadow-sm rounded-lg relative">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">تمام محصولات</h2>
                <Link
                    href="/admin/product/new"
                    className="primary-button text-sm"
                >
                    <span>ساخت محصول جدید</span>
                    <AiOutlinePlus/>
                </Link>
            </div>

            {!isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
                    {products?.map((product: ProductType) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-lg my-10 text-center w-full">در حال بارگیری...</div>
            )}

        </div>
    );
}