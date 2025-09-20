'use client'

import React, {useState} from 'react';
import {PiBasketBold} from "react-icons/pi";
import {IoMdInformationCircleOutline} from "react-icons/io";
import CheckoutForm from "@/components/checkout/Form/CheckoutForm";
import {AddressFormData, CreateOrderBody, ProductCartItem, UserType} from "@/types";
import {useGetCart} from "@/hooks/useCart";
import {useCreateOrder} from "@/hooks/useOrder";
import Link from "next/link";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {AxiosError} from "axios";
import {validateCheckoutForm} from "@/utils/validation";

interface Props {
    user: UserType | null;
}

export default function CheckoutLayout({user}: Props) {
    const [form, setForm] = useState<AddressFormData>({
        firstName: "",
        lastName: "",
        phone: "",
        province: "",
        city: "",
        street: "",
        alley: "",
        buildingNumber: 0,
        apartment: 0,
        postalCode: "",
    });

    const router = useRouter();

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const {data: userCart, isLoading} = useGetCart();
    const cartItems: ProductCartItem[] = userCart?.items || [];

    const basketTotal = cartItems.reduce((acc, item) => {
        const qty = item.quantity ?? 0;
        const price = item.product.finalPrice ?? 0;
        return acc + qty * price;
    }, 0);

    const createOrder = useCreateOrder();

    const handleSubmitOrder = async () => {
        if (!user) {
            toast.error("برای ثبت سفارش ابتدا وارد حساب کاربری خود شوید.");
            return;
        }

        if (!validateCheckoutForm(form, setErrors)) {
            toast.error("لطفا فیلد ها را درست وارد نمایید.");
            return;
        }

        if (!cartItems.length) {
            toast.error("سبد خرید شما خالی است.");
            return;
        }

        const orderData: CreateOrderBody = {
            userId: user.id,
            items: cartItems.map(item => ({
                product: item.product._id as string,
                quantity: item.quantity,
                finalPrice: Number(item.product.finalPrice),
            })),
            shippingAddress: form,
            totalPrice: Number(basketTotal),
        };

        try {
            await createOrder.mutateAsync(orderData);
            toast.success("سفارش شما با موفیت ثبت شد.")
            router.push("/")
        } catch (error) {
            const err = error as AxiosError<{ error: string }>
            const message = err.response?.data?.error || "خطایی رخ داده است.";
            toast.error(message);
        }
    };

    return (
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="rounded-md overflow-hidden shadow max-h-fit">
                <div className="flex items-center gap-x-2 px-4 h-14 bg-primary text-white">
                    <IoMdInformationCircleOutline size={30}/>
                    <span className="font-bold text-lg md:text-xl">اطلاعات شما</span>
                </div>
                <CheckoutForm form={form} setForm={setForm} errors={errors}/>
            </div>

            <div className="rounded-md overflow-hidden shadow max-h-fit">
                <div className="flex items-center gap-x-2 px-4 h-14 bg-primary text-white">
                    <PiBasketBold size={30}/>
                    <span className="font-bold text-lg md:text-xl">سفارش شما</span>
                </div>
                <div className="bg-white">
                    {isLoading ? (
                        <p className="py-8 text-center w-full">در حال لود...</p>
                    ) : cartItems.length > 0 ? (
                        <>
                            <div className="flex p-3 bg-gray-50/70 font-semibold border-b border-gray-200 text-sm">
                                <span className="block w-3/5">محصول</span>
                                <span className="block w-2/5">قیمت کل</span>
                            </div>

                            {cartItems.map(item => (
                                <div key={item.product._id} className="flex p-3 border-b border-gray-200">
                                    <div className="w-3/5 flex gap-x-2 items-center">
                                        <img
                                            src={item.product.images?.[0]}
                                            alt={item.product.title}
                                            className="w-14 h-14 rounded-sm object-cover object-top"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-semibold">{item.product.title}</span>
                                            <p className="text-xs">تعداد: <span>{item.quantity}</span></p>
                                        </div>
                                    </div>
                                    <span className="text-primary-dark my-auto font-semibold text-sm">
                                         {((item.product.finalPrice ?? 0) * item.quantity).toLocaleString("fa-IR")} تومان
                                    </span>
                                </div>
                            ))}

                            <div className="flex p-3 font-semibold border-b border-gray-200 text-sm">
                                <span className="block w-3/5">قیمت کل</span>
                                <span
                                    className="block w-2/5 text-primary-dark">{basketTotal.toLocaleString("fa-IR")} تومان</span>
                            </div>

                            <div className="flex items-center justify-center px-3 py-4">
                                <button
                                    onClick={handleSubmitOrder}
                                    className={!createOrder.isPending ? "primary-button w-full" : "primary-button-pending w-full"}
                                    disabled={createOrder.isPending}
                                >
                                    {createOrder.isPending ? "در حال ثبت" : "ثبت سفارش"}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="py-8 flex flex-col gap-2 justify-center items-center w-full">
                            <span className="font-semibold text-lg">سبد خرید شما خالی است.</span>
                            <Link href="/products">
                                <button className="primary-button w-fit">لیست محصولات</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
