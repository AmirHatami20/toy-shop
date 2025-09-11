import ProductLayout from "@/components/product/ProductLayout";
import { productService } from "@/services/productService";
import { ProductType } from "@/types";

export default async function Page({ params }: { params: Promise<{ shortName: string }> }) {
    const { shortName } = await params;

    const product = await productService.getOne(shortName);

    if (!product) {
        return <div>محصول یافت نشد.</div>;
    }

    const productsData = await productService.getAll({ category: product.category._id });
    const productsArray: ProductType[] = Array.isArray(productsData?.products) ? productsData.products : [];
    const relatedProducts = productsArray.filter((p) => p.shortName !== shortName);

    return <ProductLayout product={product} relatedProducts={relatedProducts} />;
}
