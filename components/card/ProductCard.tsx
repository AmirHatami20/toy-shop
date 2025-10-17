import React from "react";
import {ProductType} from "@/types";
import Link from "next/link";

export default function ProductCard({product}: { product: ProductType }) {
    const {images, discount, title, shortName, price, finalPrice} = product;

    return (
        <div className="flex flex-col space-y-2 bg-white shadow-sm rounded-md transition-transform p-3 m-1.5 md:m-2">
            <Link href={`/product/${shortName}`}>
                <div className="relative w-full max-h-48 overflow-hidden rounded-md">
                    <img
                        className="w-full h-full object-contain bg-white"
                        src={images[0]}
                        alt={title}
                    />
                    {discount ? (
                        <span
                            className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
              %{discount?.toLocaleString("fa-IR")}
            </span>
                    ) : null}
                </div>
                <p className="line-clamp-2 h-10 text-sm md:h-12 md:text-base mt-2 font-semibold">
                    {title}
                </p>
            </Link>

            <div className="flex justify-end items-end w-full h-9">
                <div className="flex flex-col items-end">
                    {product.discount ? (
                        <span className="text-sm text-gray-500 line-through decoration-primary/70 md:text-base">
                          {price.toLocaleString("fa-IR")}
                        </span>
                    ) : null}
                    <p className="flex items-center gap-1 text-sm md:text-base">
                        <span className="font-black">{finalPrice?.toLocaleString("fa-IR")}</span>
                        <span className="font-light text-primary">تومان</span>
                    </p>
                </div>
            </div>

            <Link href={`/product/${shortName}`} className="primary-button text-sm">
                اطلاعات محصول
            </Link>
        </div>
    );
}
