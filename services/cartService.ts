import axios from "@/lib/axios";

export const cartService = {
    getAll: async () => {
        const res = await axios.get("/cart");
        return res.data;
    },

    create: async (data: { productId: string; quantity: number }) => {
        const res = await axios.post("/cart", data);
        return res.data;
    },

    updateQuantity: async (productId: string, quantity: number) => {
        const res = await axios.put(`/cart/${productId}`, { quantity });
        return res.data;
    },

    delete: async (productId: string) => {
        const res = await axios.delete(`/cart/${productId}`);
        return res.data;
    },
};
