'use client'

import React, {useState} from 'react';
import {useGetCategories, useCreateCategory, useDeleteCategory} from "@/hooks/useCategory"
import {AiOutlinePlus} from "react-icons/ai";
import {IoTrashOutline} from "react-icons/io5";
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import {CategoryType} from "@/types";
import Overlay from "@/components/Overlay";

export default function Page() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [form, setForm] = useState({name: "", slug: ""});

    const createCategory = useCreateCategory();
    const deleteCategory = useDeleteCategory();
    const {data: categories, isLoading} = useGetCategories();

    const handleCreate = async () => {
        try {
            if (!form.name.trim() || !form.slug.trim()) {
                toast.error("نام و اسلاگ دسته بندی الزامی است.");
                return;
            }
            await createCategory.mutateAsync(form as CategoryType);
            toast.success("دسته بندی ساخته شد");
            setForm({name: "", slug: ""});
            setShowCreateModal(false);
        } catch (error) {
            const err = error as AxiosError<{ error?: string }>;
            const message = err.response?.data?.error || 'خطایی رخ داده است.';
            toast.error(message);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteCategory.mutateAsync(id)
            toast.success("دسته بندی حذف شد");
        } catch (error) {
            const err = error as AxiosError<{ error?: string }>;
            const message = err.response?.data?.error || 'خطایی رخ داده است.';
            toast.error(message);
        }
    };

    return (
        <div className="bg-white p-6 shadow-sm rounded-lg relative">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">تمام دسته بندی ها</h2>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="primary-button text-sm"
                >
                    <span>ساخت دسته بندی جدید</span>
                    <AiOutlinePlus/>
                </button>
            </div>

            {!isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {categories?.map((category: CategoryType) => (
                        <div
                            key={category._id}
                            className="flex justify-between bg-gray-50 p-3 rounded border border-gray-300"
                        >
                            <div className="flex flex-col gap-y-1">
                                <span>{category.name}</span>
                                <span className="text-sm text-gray-600">{category.slug}</span>
                            </div>
                            <button
                                onClick={() => handleDelete(category._id ?? '')}
                                className="flex items-center justify-center w-7 h-7 bg-white rounded-full border border-gray-300 text-red-600"
                            >
                                <IoTrashOutline/>
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-lg my-10 text-center w-full">در حال بارگیری...</div>
            )}

            {/* Modal */}
            {showCreateModal && <Overlay closeOverlay={() => setShowCreateModal(false)}/>}
            <div
                className={`fixed left-0 right-0 z-40 m-auto bg-white rounded-lg shadow-lg w-full max-w-md p-6 transition duration-500
                    ${!showCreateModal ? "opacity-0 scale-0" : "opacity-100 scale-100"}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-lg font-bold mb-4">ایجاد دسته بندی جدید</h3>

                {/* فیلد نام */}
                <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm(prev => ({...prev, name: e.target.value}))}
                    className="w-full border border-gray-400 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="نام دسته بندی..."
                />

                {/* فیلد اسلاگ */}
                <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm(prev => ({...prev, slug: e.target.value}))}
                    className="w-full border border-gray-400 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="slug (مثال: car-toys)"
                />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setShowCreateModal(false)}
                        className="px-2 font-semibold text-gray-700 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
                    >
                        انصراف
                    </button>
                    <button
                        onClick={handleCreate}
                        className="primary-button"
                    >
                        ذخیره
                    </button>
                </div>
            </div>
        </div>
    );
}
