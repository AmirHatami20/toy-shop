import React from "react";
import {ProductType} from "@/types";
import Link from "next/link";

export default function ProductCard({product}: { product: ProductType }) {
    const {images, discount, title, shortName, price, finalPrice} = product;

    const mainImage = typeof images[0] === "string" ? images[0] : URL.createObjectURL(images[0]);

    return (
        <div
            className="relative flex flex-col items-center h-[370px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 hover:scale-105 p-4 m-3">
            {discount ? (
                <span
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                    %{discount?.toLocaleString("fa-IR")}
                </span>
            ) : null}

            <Link href={`/product/${shortName}`} className="w-full">
                <img
                    src={mainImage}
                    alt={title}
                    className="w-full h-52 object-cover object-top rounded-md"
                />
            </Link>

            <div className="w-full flex flex-col items-center gap-2 py-3 text-center">
                <Link href={`/product/${shortName}`}>
                    <h2 className="text-lg font-semibold line-clamp-1">{title}</h2>
                </Link>

                {discount ? (
                    <div className="flex items-center gap-x-2">
                        <span className="text-gray-400 line-through text-[13px] pb-2">
                            {price?.toLocaleString("fa-IR")} تومان
                        </span>
                        <p className="text-gray-700 font-medium">
                            {finalPrice?.toLocaleString("fa-IR")} <span className="text-primary-dark">تومان</span>
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-700 font-medium">
                        {finalPrice?.toLocaleString("fa-IR")} <span className="text-primary-dark">تومان</span>
                    </p>
                )}
            </div>

            <Link href={`/product/${shortName}`} className="primary-button">
                اطلاعات محصول
            </Link>
        </div>
    );
}
