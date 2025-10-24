'use client';

import React, {useRef, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Keyboard, Navigation, Pagination} from 'swiper/modules';
import {IoIosMore} from 'react-icons/io';
import 'swiper/css';
import 'swiper/css/pagination';
import {Swiper as SwiperType} from "swiper";
import {IoClose} from "react-icons/io5";
import Overlay from "@/components/Overlay";

interface Props {
    discount: number;
    productName: string;
    images: string[];
    mainImage: string;
    setMainImage: (image: string) => void;
}

export default function ProductGallery(
    {
        discount,
        productName,
        images,
        mainImage,
        setMainImage,
    }: Props) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const mainSwiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const openOverlay = (image: string) => {
        setSelectedImage(image);
        setActiveIndex(images.findIndex((img) => img === image) || 0);
    };

    const closeOverlay = () => {
        setSelectedImage(null);
        setActiveIndex(0);
    };

    return (
        <div className="w-full lg:w-35/100">
            {/* ✅ Mobile View */}
            <div className="block lg:hidden">
                <Swiper
                    modules={[Pagination]}
                    pagination={{clickable: true}}
                    spaceBetween={10}
                    className="rounded-2xl overflow-hidden"
                >
                    {images.map((img, i) => (
                        <SwiperSlide key={i}>
                            <img
                                src={img}
                                alt={`${productName}-${i}`}
                                className="w-full h-78 object-cover rounded-2xl cursor-zoom-in"
                                onClick={() => openOverlay(img)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* ✅ Desktop View */}
            <div className="hidden lg:block">
                <div className="relative rounded-lg overflow-hidden border-2 border-primary">
                    <img
                        src={mainImage}
                        alt={`${productName}-main`}
                        className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 hover:scale-105"
                        onClick={() => openOverlay(mainImage)}
                    />
                    {discount > 0 && (
                        <div
                            className="absolute right-2 top-2 bg-red-500 text-white rounded-md px-1.5 py-1 text-sm md:text-base">
                            {discount.toLocaleString('fa-IR')}%
                        </div>
                    )}
                </div>

                {/* Thumbnail */}
                <div className="relative mt-4 pb-2 gap-1">
                    <div className="flex gap-x-3">
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setMainImage(img)}
                                className={`relative w-17 h-17 shrink-0 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                                    mainImage === img
                                        ? 'border-primary shadow-md'
                                        : 'border-gray-300 hover:border-primary'
                                }`}
                            >
                                <img
                                    src={img}
                                    alt={`thumb-${i}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>

                    {/* Fullscreen Image */}
                    <button
                        className="absolute left-0 top-0 flex items-center justify-center bg-gray-900/15 shrink-0 w-19 h-17 border-2 border-gray-500 z-20 hover:bg-gray-900/30 transition"
                        onClick={() => openOverlay(mainImage)}
                        aria-label="نمایش تمام‌صفحه"
                    >
                        <IoIosMore size={28}/>
                    </button>
                </div>
            </div>

            {/* Overlay Fullscreen */}
            {selectedImage && <Overlay closeOverlay={closeOverlay}/>}
            <div
                className={`fixed inset-0 z-40 m-auto space-y-3 bg-white border border-gray-600 rounded-lg shadow-lg w-full md:w-[90%] h-fit max-w-6xl p-6 transition duration-500
                    ${!selectedImage ? "opacity-0 scale-0" : "opacity-100 scale-100"}`
                }
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">{productName}</span>
                    <button
                        onClick={closeOverlay}
                        className="p-2 rounded-full hover:bg-gray-200 transition"
                    >
                        <IoClose size={24}/>
                    </button>
                </div>

                {/* Main Swiper */}
                <Swiper
                    modules={[Navigation, Pagination, Keyboard]}
                    navigation
                    pagination={{clickable: true}}
                    keyboard
                    className="w-full h-[500px] rounded-lg overflow-hidden"
                    initialSlide={activeIndex}
                    onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                >
                    {images.map((img, i) => (
                        <SwiperSlide key={i}>
                            <img
                                src={img}
                                alt={`zoom-${i}`}
                                className="w-full h-full object-contain"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Thumbnails */}
                <div className="flex justify-center gap-x-3 mt-4">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setActiveIndex(i);
                                mainSwiperRef.current?.slideTo(i);
                            }}
                            className={`relative w-20 h-20 shrink-0 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                                i === activeIndex
                                    ? 'border-primary scale-105 shadow-md'
                                    : 'border-gray-400 hover:border-primary'
                            }`}
                        >
                            <img
                                src={img}
                                alt={`thumb-${i}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
