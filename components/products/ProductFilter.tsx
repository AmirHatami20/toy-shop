import React from 'react';
import {IoFilter, IoFolderOpenOutline, IoSearchOutline} from "react-icons/io5";
import {FaSortAmountDown} from "react-icons/fa";
import {CategoryType} from "@/types";

interface Props {
    searchInput: string;
    setSearchInput: (searchInput: string) => void;
    categories: CategoryType[];
    selectedCategory: string;
    setSelectedCategory: (selectedCategory: string) => void;
    setShowFilterModal: (showFilterModal: boolean) => void;
    setShowSortModal: (showSortModal: boolean) => void;
}

export default function ProductFilter(
    {
        searchInput,
        setSearchInput,
        categories,
        selectedCategory,
        setSelectedCategory,
        setShowFilterModal,
        setShowSortModal
    }: Props
) {
    return (
        <div className="w-full lg:w-1/4">
            {/* Search */}
            <div className="h-16 bg-white rounded-md p-4 md:p-5">
                <div className="flex justify-between gap-x-6 h-full text-slate-500">
                    <input
                        type="text"
                        className="md:font-danaMedium placeholder-slate-500 bg-transparent flex-grow outline-none"
                        placeholder="جست و جو..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button type="submit">
                        <IoSearchOutline className="text-2xl"/>
                    </button>
                </div>
            </div>

            {/* Categories Desktop */}
            <div className="hidden lg:block bg-white rounded-md px-4 py-5 mt-6">
                <div className="flex items-center gap-x-2 mb-3">
                    <IoFolderOpenOutline className="text-2xl"/>
                    دسته بندی ها
                </div>
                <div className="flex flex-col space-y-1.5">
                    <button
                        className={`flex w-full bg-gray-100 border rounded-md p-2 ${
                            selectedCategory === ""
                                ? "border-primary text-primary-dark"
                                : "border-gray-300"
                        }`}
                        onClick={() => setSelectedCategory("")}
                    >
                        همه محصولات
                    </button>

                    {categories?.map((category: CategoryType) => (
                        <button
                            key={category._id}
                            className={`flex w-full bg-gray-100 border rounded-md p-2 ${
                                selectedCategory === category._id
                                    ? "border-primary text-primary-dark"
                                    : "border-gray-300"
                            }`}
                            onClick={() => setSelectedCategory(category._id as string)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile Filter & Sort */}
            <div className="flex lg:hidden items-center gap-5 mt-6">
                <button
                    className="flex items-center justify-center bg-white gap-x-3 w-1/2 py-2 rounded-md shadow"
                    onClick={() => setShowFilterModal(true)}
                >
                    <IoFilter className="text-xl text-primary-dark"/>
                    فیلتر
                </button>

                <button
                    className="flex items-center justify-center bg-white gap-x-3 w-1/2 py-2 rounded-md shadow"
                    onClick={() => setShowSortModal(true)}
                >
                    <FaSortAmountDown className="text-xl text-primary-dark"/>
                    بر اساس
                </button>
            </div>
        </div>
    );
}