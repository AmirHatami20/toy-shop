'use client'

import React, {useState} from "react";
import {ProductType} from "@/types";
import SwiperWrapper from "@/components/SwiperWrapper";
import {useAddToCart} from "@/hooks/useCart";
import toast from "react-hot-toast";
import {useSession} from "next-auth/react";
import BreadCrumb from "@/components/product/BreadCrumb";
import Link from "next/link";
import {BiAddToQueue} from "react-icons/bi";
import {PiBasketLight} from "react-icons/pi";
import ProductGallery from "@/components/product/ProductGallery";
import {useGuestCart} from "@/context/GuestCartContext";
import {AxiosError} from "axios";
import Spinner from "@/components/Spinner";

interface Props {
    product: ProductType;
    relatedProducts: ProductType[];
}

export default function ProductLayout({product, relatedProducts}: Props) {
    const [mainImage, setMainImage] = useState(
        (product.images?.[0] as string) || null
    );
    const [quantity, setQuantity] = useState<number>(1);

    const {data: session} = useSession();
    const user = session?.user;

    const addToCartMutation = useAddToCart();
    const guestCart = useGuestCart();

    const handleAddToBasket = async () => {
        if (product.stock <= 0) {
            toast.error("محصول ناموجود است");
            return;
        }

        try {
            if (user) {
                try {
                    await addToCartMutation.mutateAsync({productId: product._id as string, quantity});
                    toast.success("محصول به سبد خرید اضافه شد");
                } catch (error) {
                    const err = error as AxiosError<{ error?: string }>;
                    const message = err.response?.data?.error || "خطایی رخ داده است.";
                    toast.error(message);
                }
            } else {
                guestCart.addItem(product, quantity);
                toast.success("محصول به سبد خرید اضافه شد");
            }
        } catch (err) {
            console.error(err);
            toast.error("خطا در افزودن محصول به سبد خرید");
        }
    };

    return (
        <div className="container mt-5">
            <BreadCrumb product={product}/>
            {/* Grid */}
            <div className="bg-white shadow-lg rounded-md p-5 md:p-6 mb-10">
                <div className="flex flex-col lg:flex-row gap-6">
                    <ProductGallery
                        discount={product.discount ?? 0}
                        mainImage={mainImage || ""}
                        images={product.images as string[] || []}
                        setMainImage={setMainImage}
                        productName={product.title}
                    />

                    {/* توضیحات */}
                    <div className="w-full lg:w-38/100 flex flex-col gap-2 mt-2">
                        <h1 className="text-2xl font-bold">{product.title}</h1>

                        {product.description && (
                            <p className="text-gray-600 line-clamp-4">{product.description}</p>
                        )}

                        <span className="font-semibold">ویژگی های محصول:</span>
                        <ul className="space-y-2 text-sm text-gray-900">
                            {[
                                {label: "رنگ", value: product.attributes?.color},
                                {label: "سایز", value: product.attributes?.size},
                                {label: "جنس بدنه", value: product.attributes?.material},
                                {label: "تعداد تکه", value: product.attributes?.pieces},
                            ]
                                .filter((attr) => attr.value)
                                .map((attr, index) => (
                                    <li key={index} className="flex items-center gap-2 pr-2">
                                        <span className="w-2.5 h-2.5 border border-gray-600 rounded-full ml-0.5"/>
                                        <p>
                                            {attr.label}: {attr.value}
                                        </p>
                                    </li>
                                ))}
                        </ul>

                        <p className="font-semibold">
                            دسته بندی:{' '}
                            <span className="text-primary font-medium">
                                {typeof product.category === 'string' ? product.category : product.category.name}
                            </span>
                        </p>

                    </div>

                    <div
                        className="w-full lg:w-28/100 flex flex-col space-y-4 p-4 bg-orange-50 rounded-md border border-primary h-fit shadow-md"
                    >
                        <div className="text-lg text-center text-gray-700">
                            {product.stock > 0 ? (
                                <p>
                                    <span className="text-primary-dark">
                                        {product.stock?.toLocaleString("fa-IR")}{" "}
                                    </span>
                                    موجود در انبار
                                </p>
                            ) : (
                                <span className="text-red-500">ناموجود</span>
                            )}
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <span>قیمت کالا:</span>
                            {product.discount ? (
                                <div className="flex flex-col items-end">
                                      <span className="line-through text-gray-400 text-xs">
                                          {product.price?.toLocaleString("fa-IR")} تومان
                                      </span>
                                    <div className="flex items-center gap-x-2 mt-2">
                                        <span className="text-lg font-bold">
                                            {(product.price - (product.price * product.discount) / 100).toLocaleString("fa-IR")} تومان
                                        </span>
                                        <span
                                            className="flex items-center gap-x-1 justify-center w-7 h-6 text-xs rounded-md bg-red-500 text-white"
                                        >
                                            {product.discount.toLocaleString("fa-IR")}%
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <span className="font-bold text-lg">
                                    {product.price?.toLocaleString("fa-IR")} تومان
                                </span>
                            )}
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <span>کد کالا:</span>
                            <span className="font-semibold">{product.shortName}</span>
                        </div>

                        <div className="flex items-center gap-x-2 w-full">
                            <button
                                className="flex items-center justify-center h-10 w-10 text-lg bg-gray-100 border border-gray-300 rounded-md"
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <input
                                type="text"
                                className="w-full text-center h-10 border border-gray-300 rounded-md outline-none bg-white"
                                max={product.stock}
                                min={1}
                                value={quantity.toLocaleString("fa-IR")}
                                onChange={(e) =>
                                    setQuantity(Math.max(1, Math.min(Number(e.target.value), product.stock)))
                                }
                            />
                            <button
                                className="flex items-center justify-center h-10 w-10 text-lg bg-gray-100 border border-gray-300 rounded-md"
                                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                                disabled={quantity >= product.stock}
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={handleAddToBasket}
                            disabled={product.stock <= 0}
                            className={product.stock > 0 ? "primary-button" : "primary-button-pending"}
                        >
                            {!addToCartMutation.isPending ? (
                                <>
                                    <BiAddToQueue size={20}/>
                                    افزودن به سبد خرید
                                </>
                            ) : (
                                <Spinner size={25}/>
                            )}
                        </button>
                        <Link href="/cart"
                              className="flex items-center justify-center gap-x-2 bg-white border border-primary py-2 w-full rounded shadow hover:bg-gray-200 transition">
                            <PiBasketLight size={20}/>
                            مشاهده سبد خرید
                        </Link>
                    </div>
                </div>
            </div>

            {/* Related */}
            {relatedProducts && relatedProducts.length > 0 && (
                <SwiperWrapper
                    title="محصولات مرتبط"
                    items={relatedProducts}
                    subtitle="محصولاتی که با سلیقه شما جور هستند"
                />
            )}
        </div>
    );
}
