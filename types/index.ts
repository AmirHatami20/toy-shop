export interface UserType {
    id: string
    name: string
    email: string
    password?: string
    role: string;
    createdAt?: Date
    updatedAt?: Date
}

export interface AuthFormType {
    name?: string;
    email: string;
    password: string;
}

export interface ProductAttributesType {
    color?: string;
    size?: string;
    material?: string;
    pieces?: number;
}

export type ProductType = {
    _id?: string;
    title: string;
    shortName: string;
    description?: string;
    price: number;
    finalPrice?: number;
    stock: number;
    discount?: number;
    images: (string | File)[];
    category: CategoryType | string;
    attributes: {
        color?: string;
        size?: string;
        material?: string;
        pieces?: number;
    };
};

export interface CategoryType {
    _id?: string;
    name: string;
    slug: string;
}

export interface ProductCartItem {
    product: ProductType;
    quantity: number;
}

export interface CartType {
    _id?: string;
    userId?: string;
    items: ProductCartItem[];
    status: "active" | "ordered";
}

export interface AddressFormData {
    firstName: string;
    lastName: string;
    phone: string;
    province: string;
    city: string;
    street: string;
    alley: string;
    buildingNumber: number;
    apartment: number;
    postalCode: string;
}


export interface OrderItem {
    product: string;
    quantity: number;
    finalPrice: number;
}

export interface CreateOrderBody {
    userId: string;
    items: OrderItem[];
    shippingAddress: AddressFormData;
    paymentId?: string;
    totalPrice?: number;
}
