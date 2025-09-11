import {ReactNode} from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: 'داشبورد ادمین | مدیریت',
};


export default function Layout({children}: { children: ReactNode }) {

    return (
        <main>
            <Sidebar/>
            <section className="flex-1 flex flex-col md:mr-64 min-h-screen  overflow-y-auto ">
                <Header/>
                <div className="flex-1 bg-[#EDF1F1] p-5">
                    {children}
                </div>
            </section>
        </main>
    )
}