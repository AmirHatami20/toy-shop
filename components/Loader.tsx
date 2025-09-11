import React from 'react';

export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-primary font-medium">در حال بارگیری...</p>
        </div>
    );
}