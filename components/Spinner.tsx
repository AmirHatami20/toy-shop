import React from "react";

interface SpinnerProps {
    size?: number;
    color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({size = 16, color = "gray"}) => {
    return (
        <div
            className={`animate-spin rounded-full border-2 border-t-transparent border-[${color}]`}
            style={{width: size, height: size}}
        />

    );
};

export default Spinner;
