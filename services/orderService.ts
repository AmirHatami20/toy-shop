import axios from "@/lib/axios";
import {CreateOrderBody} from "@/types";

export const orderService = {
    getAll: async (userId?: string) => {
        const res = await axios.get("/order", {params: userId ? {userId} : {}});
        return res.data;
    },

    create: async (data: CreateOrderBody) => {
        const res = await axios.post("/order", data);
        return res.data;
    },

    update: async (id: string, data: CreateOrderBody) => {
        const res = await axios.patch(`/order/${id}`, data);
        return res.data;
    },

    delete: async (id: string) => {
        const res = await axios.delete(`/order/${id}`);
        return res.data;
    },
};
