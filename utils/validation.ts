import toast from "react-hot-toast";
import {AuthFormType} from "@/types";


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
