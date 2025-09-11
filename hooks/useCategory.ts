import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {categoryService} from "@/services/categoryService";
import {CategoryType} from "@/types";

// --- GET ALL ---
export const useGetCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: categoryService.getAll,
    });
};

// --- CREATE ---
export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: categoryService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["categories"]});
        },
    });
};

// --- UPDATE ---
export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, data}: { id: string, data: CategoryType }) => categoryService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["categories"]});
        },
    });
};

// --- DELETE ---
export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => categoryService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["categories"]});
        },
    });
};
