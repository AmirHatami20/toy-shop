'use client';

import React, {useState, useRef} from 'react';
import {ProductType} from '@/types';
import SwiperWrapper from '@/components/SwiperWrapper';
import BreadCrumb from '@/components/product/BreadCrumb';
import ProductGallery from '@/components/product/ProductGallery';
import ProductOptions from '@/components/product/ProductOptions';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Props {
    product: ProductType;
    relatedProducts: ProductType[];
}

export default function ProductLayout({product, relatedProducts}: Props) {
    const [mainImage, setMainImage] = useState(
        (product.images?.[0] as string) || ''
    );

    return (
        <div className="container mt-5">
            <BreadCrumb product={product}/>

            {/* Grid */}
            <div className="bg-white shadow-lg rounded-md p-5 md:p-6 mb-10">
                <div className="flex flex-col lg:flex-row gap-5 rounded-md">
                    {/* 🖼️ Gallery */}
                    <ProductGallery
                        discount={product.discount ?? 0}
                        mainImage={mainImage || ''}
                        images={product.images as string[] || []}
                        setMainImage={setMainImage}
                        productName={product.title}
                    />

                    {/* 📄 Desc */}
                    <div className="w-full lg:w-37/100 flex flex-col gap-2 mt-2">
                        <h1 className="text-2xl font-bold">{product.title}</h1>

                        {product.description && (
                            <p className="text-gray-600 line-clamp-4">{product.description}</p>
                        )}

                        <span className="font-semibold">ویژگی های محصول:</span>
                        <ul className="space-y-2 text-sm text-gray-900">
                            {[
                                {label: 'رنگ', value: product.attributes?.color},
                                {label: 'سایز', value: product.attributes?.size},
                                {label: 'جنس بدنه', value: product.attributes?.material},
                                {label: 'تعداد تکه', value: product.attributes?.pieces},
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
                                  {typeof product.category === 'string'
                                      ? product.category
                                      : product.category.name
                                  }
                            </span>
                        </p>
                    </div>

                    {/* Options */}
                    <ProductOptions product={product}/>
                </div>
            </div>

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
