import axiosClient from "@/lib/axios";

export const productService = {
    getAll: async (params?: {
        page?: number;
        limit?: number;
        search?: string;
        category?: string;
        sort?: string
    }) => {
        const res = await axiosClient.get('/product', {params});
        return res.data;
    },

    getOne: async (shortName: string) => {
        const res = await axiosClient.get(`/product/${shortName}`);
        return res.data;
    },

    create: async (formData: FormData) => {
        const res = await axiosClient.post('/product', formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
        return res.data;
    },

    update: async (shortName: string, formData: FormData) => {
        const res = await axiosClient.put(`/product/${shortName}`, formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
        return res.data;
    },

    delete: async (shortName: string) => {
        const res = await axiosClient.delete(`/product/${shortName}`);
        return res.data;
    },
};
