import React from 'react';
import Hero from "@/components/Home/Hero";
import {Categories} from "@/components/Home/Categories";
import {NewArrivals} from "@/components/Home/NewArrivals";
import {MostDiscounts} from "@/components/Home/MostDiscout";
import {MostSold} from "@/components/Home/MostSold";

export default async function Home() {
    return (
        <>
            <Hero/>
            <Categories/>
            <NewArrivals/>
            <MostDiscounts/>
            <MostSold/>
        </>
    );
}
