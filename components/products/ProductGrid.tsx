import React from 'react';
import {ProductType} from "@/types";
import ProductCard from "@/components/card/ProductCard";
import {IoChevronBack, IoChevronForward} from "react-icons/io5";
import {FiBox} from "react-icons/fi";

interface ProductGridProps {
    products: ProductType[];
    isLoadingProducts: boolean;
    page: number;
    setPage: (page: number) => void;
    totalPages: number;
    resetFilter: () => void;
}

export default function ProductGrid(
    {
        products,
        isLoadingProducts,
        page,
        setPage,
        totalPages,
        resetFilter,
    }: ProductGridProps
) {
    if (isLoadingProducts) {
        return (
            <div className="text-gray-600 text-center text-lg mt-5">
                در حال لود...
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
                <FiBox size={48} className="mb-3"/>
                <span>محصولی موجود نیست.</span>
                <button className="primary-button mt-3" onClick={resetFilter}>
                    حذف فیلتر ها
                </button>
            </div>
        );
    }

    return (
        <>
            {/* Grid */}
            <div
                id="products-grid"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:mt-3"
            >
                {products.map((product: ProductType) => (
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-2 flex-wrap">
                {/* Prev */}
                <button
                    onClick={() => page > 1 && setPage(page - 1)}
                    disabled={page === 1}
                    className={`flex items-center justify-center h-10 w-10 rounded-full shadow-md transition-colors duration-200 ${
                        page === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white text-primary-dark"
                    }`}
                >
                    <IoChevronForward size={18}/>
                </button>

                {Array.from({length: totalPages}, (_, i) => i + 1).map((p) => (
                    <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`flex items-center justify-center h-10 w-10 rounded-full shadow-md transition-colors duration-200 ${
                            page === p
                                ? "bg-primary text-white"
                                : "bg-white text-primary-dark"
                        }`}
                    >
                        {p.toLocaleString("fa-IR")}
                    </button>
                ))}

                {/* Next */}
                <button
                    onClick={() => page < totalPages && setPage(page + 1)}
                    disabled={page === totalPages}
                    className={`flex items-center justify-center h-10 w-10 rounded-full shadow-md transition-colors duration-200 ${
                        page === totalPages
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white text-primary-dark"
                    }`}
                >
                    <IoChevronBack size={18}/>
                </button>
            </div>
        </>
    );
}
