"use client";

import React, {useEffect, useState} from "react";
import {useGetProducts} from "@/hooks/useProduct";
import {CategoryType} from "@/types";
import {FaSortAmountDown} from "react-icons/fa";
import {SORT_BY} from "@/constant";

import FilterModal from "@/components/modals/FilterModal";
import SortModal from "@/components/modals/SortModal";

import {useSearchParams} from "next/navigation";
import ProductFilter from "@/components/products/ProductFilter";
import ProductGrid from "@/components/products/ProductGrid";

export default function ProductsLayout({categories}: { categories: CategoryType[] }) {
    const searchParams = useSearchParams();

    const initialSearch = searchParams.get("search") || "";
    const initialCategory = searchParams.get("category") || "";

    const [search, setSearch] = useState(initialSearch);
    const [searchInput, setSearchInput] = useState(initialSearch);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [sortBy, setSortBy] = useState("newest");
    const [page, setPage] = useState(1);

    const [showSortModal, setShowSortModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);

    const {data: productData, isLoading: isLoadingProducts} = useGetProducts({
        limit: 6,
        page,
        search,
        category: selectedCategory,
        sort: sortBy,
    });
    const products = productData?.products ?? [];
    const totalPages = productData?.pagination?.pages ?? 1;

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [page]);

    // debounce search
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearch(searchInput);
            setPage(1);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchInput]);

    // reset filter
    const resetFilter = () => {
        setSearch("");
        setSearchInput("");
        setSelectedCategory("");
        setSortBy("newest");
        setPage(1);
    };

    return (
        <div className="container my-7">
            <h1 className="text-2xl font-bold mb-6">محصولات</h1>
            <div className="flex flex-col lg:flex-row gap-5">
                <ProductFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    setShowFilterModal={setShowFilterModal}
                    setShowSortModal={setShowSortModal}
                />

                {/* Content */}
                <div className="w-full lg:w-3/4">
                    {/* Sort Desktop */}
                    <div
                        className="hidden lg:flex items-center gap-x-6 px-5 h-16 bg-white shadow-normal rounded-md overflow-x-hidden"
                    >
                        <div className="flex items-center h-full shrink-0 gap-x-2">
                            <FaSortAmountDown className="text-2xl"/>
                            <span>فیلتر بندی بر اساس:</span>
                        </div>
                        <div className="flex gap-x-5 lg:gap-x-8 h-full">
                            {SORT_BY.map((item, index) => (
                                <span
                                    key={index}
                                    onClick={() => setSortBy(item.slug)}
                                    className={`flex h-full items-center cursor-pointer px-3 py-1 transition-colors duration-200 shrink-0 ${
                                        sortBy === item.slug
                                            ? "text-primary-dark border-y-2 border-primary"
                                            : "text-gray-800"
                                    }`}
                                >
                                      {item.name}
                                    </span>
                            ))}
                        </div>
                    </div>

                    <ProductGrid
                        products={products}
                        resetFilter={resetFilter}
                        isLoadingProducts={isLoadingProducts}
                        totalPages={totalPages}
                        page={page}
                        setPage={setPage}
                    />
                </div>
            </div>

            {/* Mobile Modals */}
            <FilterModal
                isOpen={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                categories={categories ?? []}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                resetFilter={resetFilter}
            />

            <SortModal
                isOpen={showSortModal}
                onClose={() => setShowSortModal(false)}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
        </div>
    );
}
