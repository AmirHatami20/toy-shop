import axios from "@/lib/axios";
import {CategoryType} from "@/types";

export const categoryService = {
    // GET ALL
    getAll: async () => {
        const res = await axios.get("/category");
        return res.data;
    },

    // CREATE
    create: async (data: CategoryType) => {
        const res = await axios.post("/category", data);
        return res.data;
    },

    // UPDATE
    update: async (id: string, data: CategoryType) => {
        const res = await axios.put(`/category/${id}`, data);
        return res.data;
    },

    // DELETE
    delete: async (id: string) => {
        const res = await axios.delete(`/category/${id}`);
        return res.data;
    },
};
