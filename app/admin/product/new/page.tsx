'use client';

import ProductForm from '@/components/admin/Form/ProductForm';

export default function CreateProductPage() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">ایجاد محصول جدید</h1>
            <ProductForm />
        </div>
    );
}
