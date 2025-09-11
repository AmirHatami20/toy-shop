import React, {useEffect} from 'react';

interface Props {
    closeOverlay: () => void;
}

function Overlay({closeOverlay}: Props) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeOverlay();
        };

        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [closeOverlay]);

    return (
        <div
            onClick={closeOverlay}
            className="fixed right-0 left-0 top-0 bottom-0 bg-black/40 z-20 cursor-pointer backdrop-blur-[5px]"
        />
    );
}

export default Overlay;
