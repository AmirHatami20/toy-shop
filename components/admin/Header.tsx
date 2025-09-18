'use client'

import {useState} from 'react';
import {CiSearch} from "react-icons/ci";
import {useSession} from "next-auth/react";

export default function Header() {
    const [searchValue, setSearchValue] = useState('');
    const {data: session} = useSession();
    const user = session?.user;

    return (
        <div
            className="flex flex-wrap items-center gap-4 justify-center md:justify-between bg-orange-50 border-b border-primary/50 shadow-sm shadow-primary p-4"
        >
            <div className="flex flex-col">
                <span className="text-lg">
                    خوش امدید، {user?.name?.split(' ')[0]} جان
                </span>
                <span className="text-sm text-gray-600">اینجا میتونی محصولات و کاربران را کنترل کنی.</span>
            </div>
            <form
                className="flex rounded-md border px-2 py-1.5 w-xs justify-between items-center border-[#CBD5E1] bg-white">
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="outline-none p-1 text-sm"
                    placeholder="جستجو بین محولات و کاربران..."
                />
                <button>
                    <CiSearch className="text-xl"/>
                </button>
            </form>
        </div>
    );
}