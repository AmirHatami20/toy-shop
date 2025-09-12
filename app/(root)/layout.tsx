import type {Metadata} from "next";
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {auth} from "@/auth";
import {categoryService} from "@/services/categoryService";

export const metadata: Metadata = {
    title: "فروشگاه اسباب بازی",
    description: "فروشگاه اسباب بازی کریمی با بهترین قیمت و ارسال به سراسر کشور",
};

export default async function Layout({children}: Readonly<{ children: React.ReactNode; }>) {
    const session = await auth();
    const categories = await categoryService.getAll();

    return (
        <div className="flex flex-col min-h-screen">
            <Header user={session?.user} categories={categories}/>
            <main className="bg-gray-100 flex-1">
                {children}
            </main>
            <Footer/>
        </div>
    );
}
