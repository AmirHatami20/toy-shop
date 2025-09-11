import React from "react";
import SwiperWrapper from "@/components/SwiperWrapper";
import {productService} from "@/services/productService";

export async function MostSold() {
    const productData = await productService.getAll({sort: "bestseller"});
    const products = productData?.products;

    return (
        <section className="my-10 container">
            <SwiperWrapper
                title="پرفروش ترین ها"
                subtitle=" محبوب‌ترین و پرفروش‌ترین محصولات انتخاب‌شده توسط مشتریان ما"
                items={products}
            />
        </section>
    );
}

