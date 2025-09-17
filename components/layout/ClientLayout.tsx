'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SessionProvider} from 'next-auth/react';
import React from "react";
import {GuestCartProvider} from "@/context/GuestCartContext";
import {useMergeCarts} from "@/hooks/useMergeCarts";

function MergeCartHandler() {
    useMergeCarts();
    return null;
}

export default function ClientLayout({children}: { children: React.ReactNode }) {
    const queryClient = new QueryClient();

    return (
        <SessionProvider>
            <GuestCartProvider>
                <QueryClientProvider client={queryClient}>
                    <MergeCartHandler/>
                    {children}
                </QueryClientProvider>
            </GuestCartProvider>
        </SessionProvider>
    );
}
