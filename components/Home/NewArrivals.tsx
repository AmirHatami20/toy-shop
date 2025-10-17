import React from 'react';
import {ProductType} from "@/types";
import ProductCard from "@/components/card/ProductCard";
import Link from "next/link";
import {BsArrowUpLeft} from "react-icons/bs";
import {productService} from "@/services/productService";

export async function NewArrivals() {
    const productData = await productService.getAll({limit:10});
    const products = productData?.products;

    return (
        <div className="container flex flex-col my-5 md:my-10">
            <div className="flex justify-between items-center">
                <div className="section-header__wrapper">
                    <h2 className="section-header__title">آخرین محصولات ما</h2>
                    <p className="section-header__subtitle">جدیدترین اسباب‌ بازی‌های
                        هیجان‌انگیز برای
                        بازی
                        و سرگرمی
                    </p>
                </div>
                <Link
                    href="/products"
                    className="flex text-sm gap-x-2 items-center text-primary bg-white rounded-md p-2 shadow-md hover:scale-105 transition-transform"
                >
                    مشاهده همه
                    <BsArrowUpLeft/>
                </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-4">
                {products.map((product: ProductType) => (
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>

        </div>
    );
}