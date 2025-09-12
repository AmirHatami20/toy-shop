import "./globals.css";
import React from "react";
import ClientLayout from "@/components/layout/ClientLayout";
import localFont from "next/font/local";
import {Toaster} from "react-hot-toast";
import {Metadata} from "next";

const Dana = localFont({
    src: [
        {path: "/fonts/Dana-Regular.woff2", weight: "400", style: "normal"},
        {path: "/fonts/Dana-Medium.woff2", weight: "500", style: "normal"},
        {path: "/fonts/Dana-DemiBold.woff2", weight: "600", style: "normal"},
        {path: "/fonts/Dana-Bold.woff2", weight: "700", style: "normal"},
    ],
});

export const metadata: Metadata = {
    title: "ورود به سایت ما",
    description: "فروشگاه اسباب بازی کریمی با بهترین قیمت و ارسال به سراسر کشور",
}

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="fa" dir="rtl">
        <body className={Dana.className}>
        <ClientLayout>
            <Toaster position="top-center" reverseOrder={false}/>
            {children}
        </ClientLayout>
        </body>
        </html>
    );
}
