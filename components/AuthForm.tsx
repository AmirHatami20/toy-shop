"use client";

import React, {useState, ChangeEvent} from "react";
import Link from "next/link";
import {FcGoogle} from "react-icons/fc";
import {useRegister} from "@/hooks/useAuth";
import toast from "react-hot-toast";
import {AxiosError} from "axios";
import {validateAuthForm} from "@/utils/validation";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";

interface AuthFormProps {
    mode: "login" | "register";
    title: string;
}

export default function AuthForm({mode, title}: AuthFormProps) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const router = useRouter();
    const {mutateAsync, isPending} = useRegister();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateAuthForm(form, mode)) return;

        if (mode === "register") {
            try {
                await mutateAsync(form);
                const res = await signIn("credentials", {
                    redirect: false,
                    email: form.email,
                    password: form.password,
                });

                if (res?.error) {
                    toast.error("مشکلی در ورود رخ داد.");
                } else {
                    toast.success("ثبت‌نام با موفقیت انجام شد.");
                    router.push("/");
                }
            } catch (error) {
                const err = error as AxiosError<{ message?: string }>;
                const message = err.response?.data?.message || "خطایی رخ داده است.";
                toast.error(message);
            }
        } else {

            try {
                const res = await signIn("credentials", {
                    redirect: false,
                    email: form.email,
                    password: form.password,
                });

                if (res?.error) {
                    toast.error("ایمیل یا رمز عبور اشتباه است ");
                } else {
                    toast.success("با موفقیت وارد شدید ");
                    router.push("/");
                }
            } catch (error) {
                const err = error as AxiosError<{ message?: string }>;
                const message = err.response?.data?.message || "خطایی رخ داده است.";
                toast.error(message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-2xl text-shadow-xs text-shadow-primary font-bold text-center">
                {title}
            </h1>

            {mode === "register" && (
                <input
                    type="text"
                    name="name"
                    placeholder="نام و نام خانوادگی"
                    value={form.name}
                    onChange={handleChange}
                    className="auth-input w-full border rounded p-2"
                />
            )}

            <input
                type="text"
                name="email"
                placeholder="آدرس ایمیل"
                value={form.email}
                onChange={handleChange}
                required
                className="auth-input w-full border rounded p-2"
            />

            <input
                type="password"
                name="password"
                placeholder="رمز عبور"
                value={form.password}
                onChange={handleChange}
                required
                className="auth-input w-full border rounded p-2"
            />

            <button
                type="submit"
                className={`w-full ${isPending ? "primary-button-pending " : "primary-button"}`}
                disabled={isPending}
            >
                {isPending
                    ? "لطفاً صبر کنید..."
                    : mode === "register"
                        ? "ثبت نام"
                        : "ورود"}
            </button>

            {/* Google SignIn */}
            <button
                onClick={() => signIn("google", {redirectTo: "/"})}
                type="button"
                className="flex items-center justify-center gap-2 w-full py-2 border cursor-pointer border-gray-300 rounded hover:bg-gray-100 transition"
            >
                <FcGoogle/>
                <span className="font-medium">ورود با گوگل</span>
            </button>

            <p className="flex gap-x-1 items-center justify-center text-sm">
                {mode === "register" ? (
                    <>
                        قبلاً اکانت ساخته‌اید؟
                        <Link href="/login" className="text-primary font-medium">
                            ورود
                        </Link>
                    </>
                ) : (
                    <>
                        هنوز اکانت نساخته‌اید؟
                        <Link href="/register" className="text-primary font-medium">
                            ثبت نام
                        </Link>
                    </>
                )}
            </p>
        </form>
    );
}
