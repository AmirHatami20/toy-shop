import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {productService} from "@/services/productService";

// GET ALL
export const useGetProducts = (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    sort?: string
}) => {
    return useQuery({
        queryKey: ["products", params],
        queryFn: () => productService.getAll(params),
    });
};

// GET ONE
export const useGetProduct = (shortName: string) => {
    return useQuery({
        queryKey: ["product", shortName],
        queryFn: () => productService.getOne(shortName),
        enabled: !!shortName,
        staleTime: 1000 * 60,
    });
};

// CREATE
export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData: FormData) => productService.create(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]});
        },
    });
};

// UPDATE
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({shortName, formData}: { shortName: string; formData: FormData }) =>
            productService.update(shortName, formData),
        onSuccess: (_, {shortName}) => {
            queryClient.invalidateQueries({queryKey: ["products"]});
            queryClient.invalidateQueries({queryKey: ["product", shortName]});
        },
    });
};

// DELETE
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (shortName: string) => productService.delete(shortName),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]});
        },
    });
};
