'use client'
import {useMutation} from "@tanstack/react-query";
import {authService} from "@/services/authService";

// ======== MUTATIONS ======
export const useRegister = () => {
    return useMutation({
        mutationFn: authService.register,
    })
}
