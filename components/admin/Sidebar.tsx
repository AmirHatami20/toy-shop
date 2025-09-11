'use client'

import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import {ADMIN_SIDEBAR} from "@/constant";
import {usePathname} from "next/navigation";
import {TbLogout2} from "react-icons/tb";
import {FaBarsStaggered} from "react-icons/fa6";
import {useSession} from "next-auth/react";
import Overlay from "@/components/Overlay";

export default function Sidebar() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const pathName = usePathname()
    const {data: session} = useSession()
    const user = session?.user

    const handleSidebar = () => {
        setOpenSidebar(prevState => !prevState);
    }

    useEffect(() => {
        setOpenSidebar(false);
    }, [pathName]);

    return (
        <aside>
            <div className={`fixed h-full right-0 z-30 md:z-10 w-64 bg-white flex flex-col shadow-xl duration-300 ease-in-out ${
                openSidebar ? 'translate-x-0' : 'translate-x-full'
            } md:translate-x-0`}
            >
                {/* Logo */}
                <div className="px-4 py-3 border-b border-dashed border-gray-400">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="flex items-center gap-x-2">
                            <Image src="/logo.png" alt="logo" width={55} height={55}/>
                            <span className="font-bold text-lg hidden md:inline">فروشگاه اسباب بازی</span>
                        </Link>
                        <button className="text-xl md:hidden" onClick={handleSidebar}>
                            x
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-between flex-1">
                    <ul className="flex flex-col space-y-1 p-4">
                        {ADMIN_SIDEBAR.map((link, index) => (
                            <li key={index}>
                                <Link
                                    href={link.route}
                                    className={`flex items-center gap-x-2 p-2 rounded-lg ${
                                        link.route === pathName ? "bg-primary text-white" : "text-gray-700"
                                    }`}
                                >
                                    <link.Icon className="text-xl "/>
                                    <span>{link.text}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div
                        className="flex items-center rounded-full border border-gray-200 mx-3 py-1.5 px-2.5 justify-between mb-4">
                        <Image src="/no-profile.jpg" alt="no-profile" width={40} height={40} className="rounded-full"/>
                        <div className="flex flex-col">
                            <span className="text-sm">{user?.name}</span>
                            <span className="text-[10px] text-gray-600">{user?.email}</span>
                        </div>
                        <Link href="/" className="cursor-pointer">
                            <TbLogout2 className="text-2xl text-red-500"/>
                        </Link>

                    </div>
                </div>
            </div>

            {openSidebar && (
                <Overlay closeOverlay={() => setOpenSidebar(false)}/>
            )}

            {/* Trigger btn */}
            <button className="px-5 py-3 block md:hidden" onClick={handleSidebar}>
                <FaBarsStaggered className='text-xl'/>
            </button>
        </aside>
    );
}