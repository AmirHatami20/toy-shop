import {auth} from "@/auth";
import CartLayout from "@/components/cart/CartLayout";
import ProgressStepper from "@/components/ProgressStepper";

export default async function Page() {
    const session = await auth();

    return (
        <>
            <ProgressStepper currentStep={1}/>
            <CartLayout user={session?.user}/>
        </>
    )
}
