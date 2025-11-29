import ProductLayout from "@/components/product/ProductLayout";
import {productService} from "@/services/productService";
import {ProductType} from "@/types";
import {Metadata} from "next";

interface PageProps {
    params: Promise<{ shortName: string }>;
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const {shortName} = await params;
    const product = await productService.getOne(shortName);

    if (!product) {
        return {
            title: "محصول یافت نشد ❌",
            description: "این محصول در فروشگاه وجود ندارد",
        };
    }

    return {
        title: product.title,
        description: product.description || `مشخصات و خرید ${product.title}`,
        twitter: {
            title: product.title,
            description: product.description,
        },
    };
}

export default async function Page({params}: PageProps) {
    const {shortName} = await params;

    const product = await productService.getOne(shortName);

    if (!product) {
        return <div>محصول یافت نشد.</div>;
    }

    const productsData = await productService.getAll({category: product.category._id});
    const products = productsData.products || [];
    const relatedProducts = products.filter((p: ProductType) => p.shortName !== shortName);

    return <ProductLayout product={product} relatedProducts={relatedProducts}/>;
}
