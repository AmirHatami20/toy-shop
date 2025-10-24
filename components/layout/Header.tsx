'use client'

import React, {useState, useEffect} from 'react';
import Image from "next/image";
import Link from "next/link";
import {IoCartOutline, IoLogOutOutline, IoSearchOutline} from "react-icons/io5";
import {RxHamburgerMenu} from "react-icons/rx";
import {signOut} from "next-auth/react";
import {usePathname, useRouter} from "next/navigation";
import toast from "react-hot-toast";
import Overlay from "@/components/Overlay";
import {HiOutlineUser} from "react-icons/hi2";
import {HEADER_NAV, HEADER_USER_MENU} from "@/constant";
import {RiAdminLine} from "react-icons/ri";
import {IoIosArrowDown} from "react-icons/io";
import {CategoryType, ProductCartItem, UserType} from "@/types";
import ProductBasketCard from "@/components/card/ProductBasketCard";
import {useGuestCart} from "@/context/GuestCartContext"
import {useGetCart} from "@/hooks/useCart";

type MenuKey = "sidebar" | "userMenu" | "basket" | "categories";

interface Props {
    user: UserType | null;
    categories: CategoryType[];
}

export default function Header({user, categories}: Props) {
    const [open, setOpen] = useState<Record<MenuKey, boolean>>({
        sidebar: false,
        userMenu: false,
        basket: false,
        categories: false,
    });
    const [search, setSearch] = useState("");

    const pathname = usePathname();
    const router = useRouter();

    const {data: userCart, isLoading: isLoadingUserCart} = useGetCart(); // user Cart
    const guestCartContext = useGuestCart(); // guest Cart

    const cartItems: ProductCartItem[] = user ? userCart?.items || [] : guestCartContext.items;

    const {basketCount, basketTotal} = cartItems.reduce(
        (acc, item) => {
            const qty = item.quantity ?? 0;
            const price = item.product.finalPrice ?? item.product.price ?? 0;

            acc.basketCount += qty;
            acc.basketTotal += price * qty;

            return acc;
        },
        {basketCount: 0, basketTotal: 0}
    );

    useEffect(() => {
        setOpen({sidebar: false, userMenu: false, basket: false, categories: false});
    }, [pathname]);

    const handleLogout = () => {
        setOpen(prev => ({...prev, sidebar: false}));
        signOut({redirect: false}).then(() => {
            toast.success("با موفقیت از حساب خود خارج شدید.");
            router.refresh();
        });
    };

    const toggle = (key: MenuKey) => {
        setOpen(prev => ({...prev, [key]: !prev[key]}));
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!search.trim()) return;
        router.push(`/products?search=${encodeURIComponent(search)}`);
    };

    return (
        <header className="bg-white shadow-lg h-18 md:h-20">
            <div className="container h-full flex justify-between items-center">
                <button className="header-button relative md:!hidden" onClick={() => toggle("sidebar")}>
                    <RxHamburgerMenu/>
                </button>

                {/* Logo + Menu */}
                <div className="flex items-center gap-x-3">
                    <Link href="/">
                        <Image src="/logo.png" alt="logo" width={75} height={75} priority/>
                    </Link>

                    <ul className="hidden lg:flex gap-x-3">
                        {HEADER_NAV.map((item, i) => {
                            const isActive = item.href === pathname;
                            return (
                                <li key={i}>
                                    <Link href={item.href} className={isActive ? "shadowed-text" : "text-gray-800"}>
                                        {item.title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                {/* Search */}
                <div
                    className="hidden md:flex items-center w-lg rounded-full bg-gray-100 border border-gray-300 relative"
                >
                    {/* Categories */}
                    <div className="px-3 py-2 text-gray-600 flex items-center gap-x-2 cursor-pointer relative"
                         onClick={() => toggle("categories")}>
                        <span>دسته بندی ها</span>
                        <IoIosArrowDown className={`${open.categories ? "rotate-180" : ""} transition`}/>
                    </div>

                    {open.categories && (
                        <div
                            className="absolute top-full right-0 mt-1 max-h-56 overflow-y-auto w-44 bg-gray-100 border border-gray-300 rounded shadow-lg z-50">
                            <ul className="flex flex-col">
                                {categories.map(cat => (
                                    <li key={cat._id}>
                                        <Link href={`/products?category=${cat._id}`}
                                              className="block px-2 py-1.5 text-sm text-gray-800 hover:bg-gray-200 border-b border-gray-200">
                                            {cat.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <form onSubmit={handleSearch}
                          className="flex flex-1 items-center gap-x-3 border-r py-2 px-3 border-gray-300">
                        <input
                            className="flex-1 outline-none ring-0"
                            type="text"
                            placeholder="جستجو در محصولات..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit" className="text-lg text-gray-600">
                            <IoSearchOutline/>
                        </button>
                    </form>
                </div>

                {/* Actions (cart + user) */}
                <div className="flex items-center gap-x-3.5">
                    {/* Basket */}
                    {!isLoadingUserCart ? (
                        <div className="relative">
                            <button className={`header-button relative ${open.basket ? "z-50" : ""}`}
                                    onClick={() => toggle("basket")}>
                                <IoCartOutline/>
                                <span
                                    className="absolute flex justify-center items-center size-4 -top-0.5 -right-0.5 text-[12px] bg-primary rounded-full text-white"
                                >
                                  {basketCount.toLocaleString("fa-IR")}
                                </span>
                            </button>

                            {open.basket && <Overlay closeOverlay={() => toggle("basket")}/>}
                            <div
                                className={`absolute top-full left-0 w-80 sm:w-[362px] shadow-primary bg-white rounded-lg transition-all duration-200 
                                ${open.basket ? 'opacity-100 visible z-30' : 'opacity-0 invisible z-0'}`}
                            >
                                <div className="flex justify-between h-14 px-3 items-center bg-orange-100 rounded-t-lg">
                                    <span className="shadowed-text">سبد خرید من</span>
                                    <span className="text-sm">{basketCount.toLocaleString("fa-IR")} محصول</span>
                                </div>
                                <div className="flex flex-col">
                                    {cartItems.length ? (
                                        <>
                                            {cartItems.map((item, index) => (
                                                <ProductBasketCard key={index} item={item}/>
                                            ))}
                                            <div className="mt-5 px-5 pb-5">
                                                <div
                                                    className="flex items-center justify-between border-t border-neutral-200 pt-4 mb-5">
                                                    <span>مبلغ قابل پرداخت:</span>
                                                    <span
                                                        className="font-semibold">{basketTotal.toLocaleString("fa-IR")} تومان</span>
                                                </div>

                                                <Link href="/cart" className="primary-button">
                                                    مشاهده سبد خرید
                                                </Link>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex items-center justify-center text-sm h-20">
                                            سبد شما خالی است :(
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button className="header-button flex items-center justify-center" disabled>
                            <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                                 fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor"
                                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                        </button>
                    )}

                    {/* User */}
                    {user ? (
                        <div className="relative hidden md:block">
                            <button className={`header-button relative ${open.userMenu ? "z-50" : ""}`}
                                    onClick={() => toggle("userMenu")}>
                                <HiOutlineUser/>
                            </button>

                            {open.userMenu && <Overlay closeOverlay={() => toggle("userMenu")}/>}
                            <div
                                className={`absolute shadow-sm shadow-primary left-0 top-full w-64 bg-white p-5 pb-3.5 rounded-lg transition ${open.userMenu ? 'opacity-100 visible z-30' : 'opacity-0 invisible z-0'}`}
                            >
                                <div className="flex items-center border-b border-gray-300 gap-x-2 pb-2">
                                    <Image
                                        width={50}
                                        height={50}
                                        className="rounded-full"
                                        src="/no-profile.jpg"
                                        alt="noProfile"
                                    />
                                    <div className="flex flex-col gap-y-0.5">
                                        <span className="text-sm font-bold">{user.name}</span>
                                        <span className="text-gray-600 text-[11px] font-semibold">{user.email}</span>
                                    </div>
                                </div>

                                <ul className="border-b border-gray-300 py-1 mb-1">
                                    {user.role === "admin" && (
                                        <li>
                                            <Link href="/admin" className="header-menu__item hover:bg-primary">
                                                <RiAdminLine/>
                                                <span className="text-base">ادمین پنل</span>
                                            </Link>
                                        </li>
                                    )}
                                    {HEADER_USER_MENU.map((item, i) => (
                                        <li key={i}>
                                            <Link href={item.href} className="header-menu__item hover:bg-primary">
                                                {item.icon && <item.icon/>}
                                                <span className="text-base">{item.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                <button className="header-menu__item hover:bg-red-500" onClick={handleLogout}>
                                    <IoLogOutOutline/>
                                    <span className="text-base">خروج</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link href="/login" className="primary-button !hidden md:!flex">
                            ورود | عضویت
                        </Link>
                    )}
                </div>

                {/* Mobile Sidebar */}
                {open.sidebar && <Overlay closeOverlay={() => toggle("sidebar")}/>}
                <div
                    className={`fixed overflow-y-auto top-0 right-0 h-full w-64 bg-white text-sm z-50 transform transition-transform duration-300 ease-in-out ${
                        open.sidebar ? "translate-x-0" : "translate-x-full"
                    } lg:hidden`}
                >
                    {user ? (
                        <div className="flex items-center gap-x-3 p-3">
                            <Image
                                width={50}
                                height={50}
                                className="rounded-full"
                                src="/no-profile.jpg"
                                alt="noProfile"
                            />
                            <div className="flex flex-col gap-y-0.5">
                            <span className="text-sm font-bold">
                                {user.name}
                            </span>
                                <span className="text-text-muted text-[11px] font-semibold">
                                {user.email}
                            </span>
                            </div>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-orange-100 flex items-center justify-center py-4 w-full text-lg shadowed-text"
                        >
                            ورود | ثبت نام
                        </Link>
                    )}

                    {/* Sidebar links */}
                    <div className="px-3">
                        <ul className="flex flex-col py-1.5 border-b border-gray-300">
                            <li className="pt-3 text-xs text-primary-dark">
                                <span>لینک ها</span>
                            </li>
                            {HEADER_NAV.map((item, i) => {
                                const isActive = item.href === pathname;
                                return (
                                    <li key={i}>
                                        <Link
                                            href={item.href}
                                            className={`header-menu__item hover:bg-primary ${
                                                isActive ? "text-primary" : ""
                                            }`}
                                        >
                                            {item.icon && <item.icon/>}
                                            <span className="text-base">{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* User */}
                        {user && (
                            <ul className="flex flex-col py-1.5 border-b border-gray-300">
                                <li className="pt-3 text-xs text-primary-dark">
                                    <span>عملیات کاربر</span>
                                </li>
                                {user && user.role === "admin" && (
                                    <li>
                                        <Link href="/admin" className="header-menu__item hover:bg-primary">
                                            <RiAdminLine/>
                                            <span className="text-base">پنل ادمین</span>
                                        </Link>
                                    </li>
                                )}
                                {HEADER_USER_MENU.map((item, i) => (
                                    <li key={i}>
                                        <Link
                                            href={item.href}
                                            className="header-menu__item hover:bg-primary"
                                        >
                                            {item.icon && <item.icon size={22}/>}
                                            <span className="text-base">{item.title}</span>
                                        </Link>
                                    </li>
                                ))}
                                <button
                                    className="header-menu__item hover:bg-primary"
                                    onClick={handleLogout}
                                >
                                    <IoLogOutOutline size={22}/>
                                    <span className="text-base">خروج</span>
                                </button>
                            </ul>
                        )}

                        {/* Sidebar categories */}
                        <ul className="flex flex-col py-1.5">
                            <li className="pt-3 text-xs text-primary-dark">
                                <span>دسته بندی ها</span>
                            </li>

                            {categories.map((cat, idx) => (
                                <li key={idx}>
                                    <div className="flex flex-col mt-2">
                                        <Link
                                            href={`/products?category=${cat._id}`}
                                            className="flex items-center px-3 py-2 w-full justify-between hover:bg-primary"
                                        >
                                            {cat.name}
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}
