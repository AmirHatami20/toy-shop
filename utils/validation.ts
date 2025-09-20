import toast from "react-hot-toast";
import {AddressFormData, AuthFormType, ProductType} from "@/types";


export const validateAuthForm = (form: AuthFormType, mode: "login" | "register") => {
    if (mode === "register") {
        if (!form.name?.trim()) {
            toast.error("نام و نام خانوادگی الزامی است.");
            return false;
        }
        const persianRegex = /^[\u0600-\u06FF\s]+$/;
        if (!persianRegex.test(form.name)) {
            toast.error("نام و نام خانوادگی باید فقط فارسی باشد.");
            return false;
        }
    }

    if (!form.email.trim()) {
        toast.error("ایمیل الزامی است.");
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
        toast.error("ایمیل معتبر نیست.");
        return false;
    }

    if (!form.password.trim()) {
        toast.error("رمز عبور الزامی است.");
        return false;
    }
    if (form.password.length < 6) {
        toast.error("رمز عبور باید حداقل ۶ کاراکتر باشد.");
        return false;
    }

    return true;
};

export const validateCheckoutForm = (
    form: AddressFormData,
    setErrors: (errors: { [key: string]: string }) => void
) => {
    const newErrors: { [key: string]: string } = {};
    const persianRegex = /^[\u0600-\u06FF\s]+$/;

    // نام
    if (!form.firstName) newErrors.firstName = "نام الزامی است";
    else if (!persianRegex.test(form.firstName)) newErrors.firstName = "نام باید فارسی باشد";

    // نام خانوادگی
    if (!form.lastName) newErrors.lastName = "نام خانوادگی الزامی است";
    else if (!persianRegex.test(form.lastName)) newErrors.lastName = "نام خانوادگی باید فارسی باشد";

    // شماره همراه
    if (!form.phone) newErrors.phone = "شماره همراه الزامی است";
    else if (!/^09\d{9}$/.test(form.phone)) newErrors.phone = "شماره همراه معتبر نیست";

    // استان و شهر
    if (!form.province) newErrors.province = "انتخاب استان الزامی است";
    if (!form.city) newErrors.city = "انتخاب شهر الزامی است";

    // آدرس
    if (!form.street) newErrors.street = "وارد کردن خیابان الزامی است";
    if (!form.alley) newErrors.alley = "وارد کردن کوچه الزامی است";

    // پلاک و واحد
    if (!form.buildingNumber) newErrors.buildingNumber = "وارد کردن پلاک الزامی است";
    if (!form.apartment) newErrors.apartment = "وارد کردن واحد الزامی است";

    // کد پستی
    if (!form.postalCode) newErrors.postalCode = "کد پستی الزامی است";
    else if (!/^\d{10}$/.test(form.postalCode)) newErrors.postalCode = "کد پستی باید ۱۰ رقمی باشد";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

export const validateProductForm = (
    form: ProductType,
    setErrors: (errors: { [key: string]: string }) => void
) => {
    const newErrors: { [key: string]: string } = {};
    if (!form.title) newErrors.title = 'عنوان محصول الزامی است.';
    if (!form.shortName) newErrors.shortName = 'نام کوتاه الزامی است.';
    if (!form.price) newErrors.price = 'قیمت الزامی است.';
    if (!form.category) newErrors.category = 'دسته‌بندی الزامی است.';
    if (form.stock < 0) newErrors.stock = "موجودی نمی‌تواند منفی باشد.";

    setErrors(newErrors);
    return Object.keys(newErrors)
}
