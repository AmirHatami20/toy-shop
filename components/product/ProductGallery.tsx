import React from 'react';

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
    }: Props
) {
    return (
        <div className="w-full lg:w-34/100 flex flex-col gap-4">
            <div
                className="w-full relative overflow-hidden"
            >
                {discount ?
                    <span className="bg-red-500 px-2 py-1 text-white absolute top-0 right-0 rounded-md">
                        {discount.toLocaleString("fa-IR")}%
                    </span>
                    : null
                }
                {mainImage ? (
                    <img
                        src={mainImage}
                        alt={productName}
                        className="h-[250px] md:h-[350px] rounded-md w-full object-cover object-top border-2 border-primary"
                    />
                ) : (
                    <span className="text-gray-400">بدون تصویر</span>
                )}
            </div>

            {images?.length > 0 && (
                <div className="flex gap-3">
                    {images.map((img: string | File, i: number) => {
                        const src = typeof img === "string" ? img : URL.createObjectURL(img);
                        return (
                            <div
                                key={i}
                                onClick={() => setMainImage(src)}
                                className={`w-20 h-20 border border-gray-300 rounded-md cursor-pointer overflow-hidden flex items-center justify-center ${
                                    mainImage === src ? "ring-2 ring-primary" : ""
                                }`}
                            >
                                <img
                                    src={src}
                                    alt={`gallery-${i}`}
                                    className="max-h-full max-w-full object-cover"
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}