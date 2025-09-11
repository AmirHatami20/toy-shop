import Link from "next/link";
import {IoHomeOutline} from "react-icons/io5";
import {ProductType} from "@/types";

export default function BreadCrumb({product}: { product: ProductType }) {
    return (
        <nav className="flex items-stretch w-full bg-white rounded-md px-3 mb-5 shadow-sm overflow-x-hidden">
            <Link href="/public" className="flex items-center text-gray-600 hover:text-black shrink-0 px-2 py-2">
                <IoHomeOutline size={20}/>
            </Link>
            <Divider/>
            <Link href="/products" className="flex items-center text-gray-600 hover:text-black shrink-0 px-2 py-2">
                محصولات
            </Link>
            <Divider/>
            <Link
                href={`/products?category=${
                    typeof product.category === "string"
                        ? product.category
                        : product.category._id
                }`}
                className="flex items-center text-gray-600 hover:text-black shrink-0 px-2 py-2"
            >
                {typeof product.category === "string"
                    ? product.category
                    : product.category.name}
            </Link>
            <Divider/>
            <span className="flex items-center text-gray-800 font-medium shrink-0 px-2">{product.title}</span>
        </nav>
    );
}

function Divider() {
    return (
        <span
            className="w-[2px] bg-gray-100 mx-1 self-stretch shrink-0"
            style={{
                transform: "rotate(15deg)",
            }}
        />
    );
}
