'use client';

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50">
            <h1 className="text-5xl md:text-6xl font-extrabold text-red-500 mb-4">
                404
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-6">
                متأسفیم، صفحه‌ای که دنبال آن هستید وجود ندارد.
            </p>

            <Link
                href="/"
                className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300"
            >
                بازگشت به خانه
            </Link>
        </div>
    );
}
