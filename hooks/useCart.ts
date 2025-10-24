import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {cartService} from "@/services/cartService";
import {useSession} from "next-auth/react";

// GET ALL CART
export const useGetCart = () => {
    const {data: session} = useSession();

    return useQuery({
        queryKey: ["cart"],
        queryFn: () => cartService.getAll(),
        enabled: !!session?.user
    });
};

// ADD TO CART
export const useAddToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({productId, quantity}: { productId: string; quantity: number }) =>
            cartService.create({productId, quantity}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["cart"]});
        },
    });
};

// UPDATE QUANTITY
export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({productId, quantity}: { productId: string; quantity: number }) =>
            cartService.updateQuantity(productId, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["cart"]});
        },
    });
};

// DELETE ITEM
export const useDeleteCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) => cartService.delete(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["cart"]});
        },
    });
};
