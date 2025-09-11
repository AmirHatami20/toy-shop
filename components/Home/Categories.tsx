import React from "react";
import {CATEGORIES_DATA} from "@/constant";
import Image from "next/image";
import Link from "next/link";

export function Categories() {
    return (
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-5 md:my-10">
            {CATEGORIES_DATA.map((cat) => (
                <Link
                    href={`/products?category=${cat.id}`}
                    key={cat.id}
                    className="flex items-center justify-between rounded-md py-3 m-3 text-white shadow-lg hover:scale-105 transition-transform"
                    style={{
                        background: `linear-gradient(135deg, ${cat.color2} 50%, ${cat.color1} 50%)`,
                    }}
                >
                    <div className="flex flex-col items-start p-4">
                        {cat.subtitle && <p className="text-sm mb-2">{cat.subtitle}</p>}
                        <h3 className="text-2xl font-bold mb-3">{cat.title}</h3>
                        <button className="text-xs bg-white text-gray-800 px-2 py-1 rounded-md shadow-xl">
                            مشاهده
                        </button>
                    </div>
                    {cat.image && (
                        <Image
                            width={150}
                            height={150}
                            alt="category-image"
                            className="object-contain"
                            src={cat.image}
                        />
                    )}
                </Link>
            ))}
        </div>
    );
}
