import React from 'react';
import {ProductType} from "@/types";
import {FaEye, FaRegTrashAlt} from "react-icons/fa";
import {MdOutlineEdit} from "react-icons/md";
import Link from "next/link";
import {useDeleteProduct} from "@/hooks/useProduct";
import toast from "react-hot-toast";
import {AxiosError} from "axios";
import Spinner from "@/components/Spinner";

export default function ProductCard({product}: { product: ProductType }) {
    const deleteProduct = useDeleteProduct();

    const mainImage = product.images[0] as string;

    const handelDeleteProduct = async (id: string) => {
        try {
            await deleteProduct.mutateAsync(id)
            toast.success("محصول با موفقیت حذف شد.")
        } catch (error) {
            const err = error as AxiosError<{ error?: string }>;
            const message = err.response?.data?.error || 'خطایی رخ داده است.';
            toast.error(message);
        }
    }

    return (
        <div
            className="bg-gray-50 border border-gray-300 w-full p-3 md:p-4 rounded flex flex-col overflow-hidden justify-center items-center gap-4 relative">
            {/* تخفیف */}
            {product.discount ? (
                <span
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                    {product.discount.toLocaleString("fa-IR")}%
                </span>
            ) : null}

            <div className="flex items-center justify-between gap-x-2 w-full">
                <div className="flex items-center gap-x-5">
                    <img
                        src={mainImage}
                        alt={product.title}
                        className="w-28 h-28 md:w-36 md:h-36 rounded object-cover border border-gray-400"
                    />
                    <div className="flex flex-col gap-y-2">
                        <h3 className="font-bold md:text-lg">{product.title}</h3>
                        <div className="text-gray-700">
                            قیمت:{" "}
                            {product.discount ? (
                                <span className="text-gray-400 line-through text-[13px] pb-2">
                                    {product.price.toLocaleString("fa-IR")}
                                </span>
                            ) : null
                            }
                            <p className="text-gray-700 text-sm font-medium">
                                {product.finalPrice?.toLocaleString("fa-IR")}{" "}
                                <span className="text-primary">تومان</span>
                            </p>

                        </div>
                        <p>
                            <span className="text-primary-dark">دسته بندی:</span>{" "}
                            {typeof product.category === "string" ? product.category : product.category.name}
                        </p>
                        <p>
                            <span className="text-primary-dark">موجودی:</span>{" "}
                            {product.stock.toLocaleString("fa-IR")} عدد
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex gap-x-4">
                <Link
                    href={`/product/${product.shortName}`}
                    className="rounded-full bg-green-500 w-10 h-10 text-white flex items-center justify-center text-lg"
                >
                    <FaEye/>
                </Link>
                <Link
                    href={`/admin/product/edit/${product.shortName}`}
                    className="rounded-full bg-blue-400 w-10 h-10 text-white flex items-center justify-center text-2xl"
                >
                    <MdOutlineEdit/>
                </Link>
                <button
                    className="rounded-full bg-red-600 w-10 h-10 text-white flex items-center justify-center text-lg"
                    onClick={() => handelDeleteProduct(product._id as string)}
                >
                    {!deleteProduct.isPending ? <FaRegTrashAlt/> : <Spinner size={18} color="red"/>}
                </button>
            </div>
        </div>
    );
}
