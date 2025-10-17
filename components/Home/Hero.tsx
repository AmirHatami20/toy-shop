import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section
            className="w-full bg-gradient-to-l from-orange-200 via-orange-50 to-yellow-50 rounded-md shadow-md p-5 md:p-10 mt-1"
        >
            <div className="container flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-800 leading-snug">
                        دنیای رنگی <span className="text-primary">اسباب‌بازی‌ها</span>
                    </h1>
                    <p className="mt-3 sm:mt-4 text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
                        بهترین و جذاب‌ترین اسباب‌بازی‌ها برای کوچولوهای شما
                        با قیمت عالی و کیفیت بی‌نظیر!
                    </p>

                    <div
                        className="mt-5 sm:mt-6 flex items-center justify-center md:justify-start gap-3 sm:gap-4 flex-wrap">
                        <Link
                            href="/products"
                            className="bg-primary hover:bg-primary-dark text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold shadow-lg transition text-sm sm:text-base"
                        >
                            خرید کنید
                        </Link>
                        <Link
                            href="/products"
                            className="bg-white border border-primary text-primary hover:bg-orange-50 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold transition text-sm sm:text-base"
                        >
                            مشاهده دسته‌بندی‌ها
                        </Link>
                    </div>
                </div>

                {/* تصویر سمت چپ */}
                <div className="flex-1 flex justify-center">
                    <Image
                        src="/hero.png"
                        alt="اسباب بازی"
                        width={500}
                        height={450}
                        className="drop-shadow-lg rounded-md"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
