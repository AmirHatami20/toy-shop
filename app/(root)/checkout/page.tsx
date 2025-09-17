import React from 'react';
import ProgressStepper from "@/components/ProgressStepper";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import CheckoutLayout from "@/components/checkout/CheckoutLayout";

export default async function Page() {
    const session = await auth()

    if (!session) {
        redirect("/login");
    }

    return (
        <>
            <ProgressStepper currentStep={2}/>
            <CheckoutLayout user={session?.user}/>
        </>
    );
}