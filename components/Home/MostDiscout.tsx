import React from "react";
import SwiperWrapper from "@/components/SwiperWrapper";
import {productService} from "@/services/productService";

export async function MostDiscounts() {
    const productData = await productService.getAll({sort: "discount_desc"});
    const products = productData?.products;

    return (
        <section className="bg-primary py-3">
            <div className="my-5 container">
                <SwiperWrapper
                    title="بیشترین تخفیف ها"
                    subtitle=" محصولاتی با بالاترین درصد تخفیف ویژه برای خریدی به‌صرفه"
                    items={products}
                    white={true}
                />
            </div>
        </section>
    );
}
