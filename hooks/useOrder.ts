import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {orderService} from "@/services/orderService";
import {CreateOrderBody} from "@/types";

export const useGetOrders = (params?: { userId: string }) => {
    return useQuery({
        queryKey: ["orders", params?.userId],
        queryFn: () => orderService.getAll(params?.userId),
    });
};

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateOrderBody) => orderService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["orders"]});
            queryClient.invalidateQueries({queryKey: ["cart"]})
        },
    });
};
