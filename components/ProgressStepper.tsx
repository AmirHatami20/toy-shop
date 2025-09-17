'use client';

import React from 'react';
import {PiCheckBold} from "react-icons/pi";

interface Props {
    currentStep: number; // 1 = Cart, 2 = Payment, 3 = Complete
}

export default function ProgressStepper({currentStep}: Props) {
    const steps = ['سبد خرید', 'پرداخت', 'تکمیل'];

    return (
        <div className="container bg-white rounded-md my-6 p-4 shadow">
            <div className="flex justify-between items-center relative">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = currentStep === stepNumber;
                    const isCompleted = stepNumber < currentStep;

                    return (
                        <div key={step} className="flex-1 flex flex-col items-center relative">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 
                                ${isCompleted ? 'bg-primary text-white' :
                                    isActive ? 'border-2 border-primary text-primary bg-white' : 'bg-gray-200 text-gray-500'
                                }`}
                            >
                                {isCompleted ? <PiCheckBold size={20}/> : stepNumber.toLocaleString("fa-IR")}
                            </div>
                            <span
                                className={`mt-2 text-sm md:text-base ${isActive || isCompleted ? 'text-primary font-semibold' : 'text-gray-500'}`}
                            >
                                {step}
                            </span>

                            {/* خط بین دایره‌ها */}
                            {index < steps.length - 1 && (
                                <div
                                    className={`absolute top-4 w-full h-2 -translate-x-1/2 
                                    ${isCompleted ? 'bg-primary' : 'bg-gray-200'}`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
