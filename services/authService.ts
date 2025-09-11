import axiosClient from "@/lib/axios";
import {AuthFormType} from "@/types";

export const authService = {
    register: async (form: AuthFormType) => {
        const res = await axiosClient.post("/auth/register", form)
        return res.data;
    }
}