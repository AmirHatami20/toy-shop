import {useEffect, useRef} from "react";
import {useSession} from "next-auth/react";
import {useGuestCart} from "@/context/GuestCartContext";
import {useAddToCart} from "@/hooks/useCart";

export const useMergeCarts = () => {
    const {status} = useSession();
    const {items: guestItems, clearCart} = useGuestCart();
    const addToCart = useAddToCart();

    const mergedRef = useRef(false);

    useEffect(() => {
        if (status === "authenticated" && !mergedRef.current && guestItems.length > 0) {
            guestItems.forEach(item => {
                addToCart.mutate({
                    productId: item.product?._id as string,
                    quantity: item.quantity,
                });
            });

            clearCart();
            mergedRef.current = true;
        }
    }, [addToCart, clearCart, guestItems, status]);
};
