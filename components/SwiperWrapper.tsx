'use client'

import {Swiper, SwiperSlide} from "swiper/react";
import {Swiper as SwiperType} from "swiper";
import {Navigation, Pagination, Autoplay} from "swiper/modules";
import {GrNext, GrPrevious} from "react-icons/gr";
import React, {useRef, useEffect} from "react";
import {ProductType} from "@/types";
import ProductCard from "@/components/card/ProductCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {NavigationOptions} from "swiper/types";

interface Props {
    title: string;
    subtitle: string;
    items: ProductType[];
    white?: boolean;
}

const breakpointsConfig = {
    0: {slidesPerView: 1},
    360: {slidesPerView: 2},
    640: {slidesPerView: 3},
    1024: {slidesPerView: 4},
    1280: {slidesPerView: 5},
};

function SwiperWrapper({title, subtitle, items, white}: Props) {
    const prevBtnRef = useRef<HTMLButtonElement>(null);
    const nextBtnRef = useRef<HTMLButtonElement>(null);
    const swiperRef = useRef<SwiperType | null>(null);

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.navigation) {
            swiperRef.current.navigation.destroy();
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, []);

    if (!items.length) {
        return (
            <div className="text-center text-red-500 my-10">
                محصولی یافت نشد.
            </div>
        );
    }

    return (
        <div className="my-5 md:my-10">
            {/* Header */}
            <div className="flex justify-between items-center w-full">
                <div className="section-header__wrapper">
                    <h2
                        className={!white ? "section-header__title" : "section-header__title-white"}
                    >
                        {title}
                    </h2>
                    <p
                        className={!white ? "section-header__subtitle" : "section-header__subtitle-white"}
                    >
                        {subtitle}
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        ref={prevBtnRef}
                        className="swiper-button"
                    >
                        <GrNext size={18}/>
                    </button>
                    <button
                        ref={nextBtnRef}
                        className="swiper-button"
                    >
                        <GrPrevious size={18}/>
                    </button>
                </div>
            </div>

            {/* Slider */}
            <div className="mt-4">
                <Swiper
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        setTimeout(() => {
                            if (swiper.navigation && prevBtnRef.current && nextBtnRef.current) {
                                const nav = swiper.params.navigation as NavigationOptions;
                                nav.prevEl = prevBtnRef.current;
                                nav.nextEl = nextBtnRef.current;
                                swiper.navigation.destroy();
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        });
                    }}
                    breakpoints={breakpointsConfig}
                    modules={[Pagination, Navigation]}
                >
                    {items.map((product) => (
                        <SwiperSlide key={product._id}>
                            <ProductCard product={product}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default SwiperWrapper;
