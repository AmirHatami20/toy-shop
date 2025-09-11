import React from "react";
import {CategoryType} from "@/types";
import {IoCloseCircleOutline, IoFolderOpenOutline} from "react-icons/io5";
import {GoTrash} from "react-icons/go";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    categories: CategoryType[];
    selectedCategory: string;
    setSelectedCategory: (selectedCategory: string) => void;
    resetFilter: () => void;
}

export default function FilterModal(
    {
        isOpen,
        onClose,
        categories,
        selectedCategory,
        setSelectedCategory,
        resetFilter,
    }: Props
) {
    return (
        <div
            className={`fixed inset-0 z-50 flex flex-col bg-white transform transition-all duration-300 ease-in-out
            ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
        >
            {/* Header */}
            <div className="flex items-center justify-between bg-gray-100 p-4">
                <button onClick={onClose} className="flex items-center gap-x-2">
                    <IoCloseCircleOutline size={20}/>
                    <span className="text-lg font-semibold">فیلتر ها</span>
                </button>
                <button
                    onClick={resetFilter}
                    className="flex items-center gap-x-2 text-red-500"
                >
                    <span className="text-lg">حذف فیلتر ها</span>
                    <GoTrash size={20}/>
                </button>
            </div>

            {/* Categories */}
            <div className="p-4 overflow-y-auto flex-1">
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

            {/* Footer */}
            <div className="px-4 pb-6">
                <button onClick={onClose} className="primary-button w-full">
                    اعمال فیلتر
                </button>
            </div>
        </div>
    );
}
