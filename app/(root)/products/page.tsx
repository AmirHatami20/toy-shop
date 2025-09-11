import React from 'react';
import ProductsLayout from "@/components/products/ProductsLayout";
import {categoryService} from "@/services/categoryService";

export default async function Page() {
    const categories = await categoryService.getAll();

    return (
        <ProductsLayout categories={categories}/>
    );
}