'use client';

import React, {useEffect, useState} from 'react';
import {toast} from 'react-hot-toast';
import Link from 'next/link';
import {LuMoveRight} from 'react-icons/lu';
import {VscCloudUpload} from 'react-icons/vsc';
import {ProductType, CategoryType} from '@/types';
import {useCreateProduct, useUpdateProduct, useGetProduct} from '@/hooks/useProduct';
import {useGetCategories} from '@/hooks/useCategory';
import FormField from '@/components/admin/Form/FormField';
import {GoTrash} from 'react-icons/go';

export default function ProductForm({shortName}: { shortName?: string }) {
    const [form, setForm] = useState<ProductType>({
        title: '',
        shortName: '',
        description: '',
        price: 0,
        stock: 0,
        discount: 0,
        images: [],
        category: '',
        attributes: {color: '', size: '', material: '', pieces: 0},
    });

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const {data: product, isLoading} = useGetProduct(shortName as string);
    const {data: categories, isLoading: isLoadingCategories} = useGetCategories();

    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct();

    useEffect(() => {
        if (shortName && product) {
            setForm({
                title: product.title || '',
                shortName: product.shortName || '',
                description: product.description || '',
                price: product.price,
                stock: product.stock,
                discount: product.discount,
                images: [],
                category: product.category._id,
                attributes: {
                    color: product.attributes?.color || '',
                    size: product.attributes?.size || '',
                    material: product.attributes?.material || '',
                    pieces: product.attributes?.pieces || 0,
                },
            });
            setImagePreviews(product.images || []);
        }
    }, [product, shortName]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        if (name in form.attributes) {
            setForm((prev) => ({
                ...prev,
                attributes: {
                    ...prev.attributes,
                    [name]: name === 'pieces' ? Number(value) : value,
                },
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: ['price', 'stock', 'discount'].includes(name) ? Number(value) : value,
            }));
        }
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const fileArray = Array.from(files);
        const previews = fileArray.map((f) => URL.createObjectURL(f));

        setForm((prev) => ({
            ...prev,
            images: [...prev.images, ...fileArray],
        }));

        setImagePreviews((prev) => [...prev, ...previews]);
    };

    const handleRemoveImage = (src: string) => {
        setImagePreviews((prev) => prev.filter((imageSrc) => imageSrc !== src));

        setForm((prev) => {
            const index = imagePreviews.indexOf(src);
            if (index === -1) return prev;

            const newImages = [...prev.images];
            newImages.splice(index, 1);

            return {...prev, images: newImages};
        });

        URL.revokeObjectURL(src);
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: { [key: string]: string } = {};
        if (!form.title) newErrors.title = 'عنوان محصول الزامی است.';
        if (!form.shortName) newErrors.shortName = 'نام کوتاه الزامی است.';
        if (!form.price) newErrors.price = 'قیمت الزامی است.';
        if (!form.category) newErrors.category = 'دسته‌بندی الزامی است.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error('لطفاً فیلدهای ضروری را پر کنید.');
            return;
        }

        const formData = new FormData();
        Object.entries(form).forEach(([key, val]) => {
            if (val != null && key !== 'images') {
                if (key === 'attributes') {
                    formData.append("attributes", JSON.stringify(val));
                } else {
                    formData.append(key, val.toString());
                }
            }
        });

        form.images.forEach((img) => formData.append('images', img));

        try {
            if (shortName) {
                await updateProduct.mutateAsync({shortName: shortName, formData});
                toast.success('محصول با موفقیت ویرایش شد.');
            } else {
                await createProduct.mutateAsync(formData);
                toast.success('محصول جدید با موفقیت ثبت شد.');
                setForm({
                    title: '',
                    shortName: '',
                    description: '',
                    price: 0,
                    stock: 0,
                    discount: 0,
                    images: [],
                    category: '',
                    attributes: {color: '', size: '', material: '', pieces: 0},
                });
                setImagePreviews([]);
            }
        } catch {
            toast.error('خطا در ذخیره محصول');
        }
    };

    return (
        <div className="mt-5">
            <Link
                href="/admin/product"
                className="flex gap-x-1.5 items-center bg-white p-1.5 rounded-lg w-max text-sm border border-gray-300"
            >
                <LuMoveRight/>
                برگشت
            </Link>

            {!isLoading && !isLoadingCategories ? (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                    {/* فیلدهای ضروری */}
                    <FormField
                        label="عنوان محصول"
                        name="title"
                        value={form.title}
                        placeholder="مثال: ماشین کنترلی"
                        onChange={handleChange}
                        error={errors.title}
                        required={true}
                    />
                    <FormField
                        label="نام کوتاه"
                        name="shortName"
                        value={form.shortName}
                        placeholder="نام یکتا برای URL"
                        onChange={handleChange}
                        error={errors.shortName}
                        required={true}
                    />
                    <FormField
                        label="قیمت"
                        name="price"
                        type="text"
                        value={form.price === 0 ? '' : form.price}
                        placeholder="به تومان"
                        onChange={handleChange}
                        error={errors.price}
                        required={true}
                    />

                    {/* دسته‌بندی */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                            دسته‌بندی <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="category"
                            value={typeof form.category === 'string' ? form.category : form.category.name}
                            onChange={handleChange}
                            className="admin-input"
                        >
                            <option value="">انتخاب کنید...</option>
                            {categories?.map((cat: CategoryType) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <span className="text-xs text-red-500">{errors.category}</span>
                        )}
                    </div>

                    <FormField
                        label="موجودی"
                        name="stock"
                        type="text"
                        value={form.stock === 0 ? '' : form.stock}
                        placeholder="تعداد موجود"
                        onChange={handleChange}
                    />
                    <FormField
                        label="تخفیف (%) (اختیاری)"
                        name="discount"
                        type="text"
                        value={form.discount === 0 ? '' : form.discount || 0}
                        placeholder="درصد تخفیف"
                        onChange={handleChange}
                    />

                    {/* فیلدهای اختیاری */}
                    <FormField
                        label="رنگ (اختیاری)"
                        name="color"
                        placeholder="مثال: قرمز یا مشکی"
                        value={form.attributes?.color ?? ''}
                        onChange={handleChange}
                    />
                    <FormField
                        label="سایز (اختیاری)"
                        name="size"
                        value={form.attributes?.size ?? ''}
                        placeholder="مثال: XL یا 42"
                        onChange={handleChange}
                    />
                    <FormField
                        label="جنس (اختیاری)"
                        name="material"
                        value={form.attributes?.material ?? ''}
                        placeholder="مثال: پلاستیک یا فلز"
                        onChange={handleChange}
                    />
                    <FormField
                        label="تعداد قطعات (اختیاری)"
                        name="pieces"
                        type="text"
                        value={form.attributes?.pieces === 0 ? '' : form.attributes?.pieces || 0}
                        placeholder="مثال: 10"
                        onChange={handleChange}
                    />

                    {/* تصاویر */}
                    <div className="col-span-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            تصاویر محصول
                        </label>

                        {imagePreviews.length > 0 && (
                            <div
                                className="flex gap-2 overflow-x-auto p-2 mb-3 bg-white border border-gray-300 rounded">
                                {imagePreviews.map((src, i) => (
                                    <div key={i}
                                         className="relative flex-shrink-0 w-24 h-24 rounded border border-gray-400 overflow-hidden">
                                        <img
                                            src={src}
                                            alt={`preview-${i}`}
                                            className="h-24 w-24 object-cover"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                                            onClick={() => handleRemoveImage(src)}
                                        >
                                            <GoTrash className="w-3 h-3"/>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div>
                            <button
                                type="button"
                                onClick={() => document.getElementById('images')?.click()}
                                className="primary-button text-sm"
                            >
                                <VscCloudUpload className="text-2xl"/>
                                افزودن عکس
                            </button>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                id="images"
                                className="hidden"
                                onChange={handleImage}
                            />
                        </div>
                    </div>

                    {/* توضیحات */}
                    <div className="flex flex-col space-y-1 col-span-full">
                        <label htmlFor="description" className="text-sm font-medium text-gray-700">
                            توضیحات (اختیاری)
                        </label>
                        <textarea
                            name="description"
                            className="admin-input min-h-40"
                            placeholder="توضیحات محصول..."
                            value={form.description}
                            onChange={handleChange}
                        />
                    </div>

                    {/* دکمه */}
                    <button
                        type="submit"
                        disabled={createProduct.isPending || updateProduct.isPending}
                        className={`col-span-full w-full md:w-1/2 mx-auto ${
                            createProduct.isPending || updateProduct.isPending
                                ? 'primary-button-pending'
                                : 'primary-button'
                        }`}
                    >
                        {shortName
                            ? updateProduct.isPending
                                ? 'در حال بروزرسانی...'
                                : 'ذخیره تغییرات'
                            : createProduct.isPending
                                ? 'در حال ساخت...'
                                : 'ساخت محصول'}
                    </button>
                </form>
            ) : (
                <div className="text-center bg-white text-gray-600 py-10 mt-4">
                    در حال بارگیری...
                </div>
            )}
        </div>
    );
}
