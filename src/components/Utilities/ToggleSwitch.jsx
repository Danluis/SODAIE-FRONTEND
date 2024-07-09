import React, { useState } from 'react';

const ToggleSwitch = ({ onClick }) => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
        onClick();
    };

    return (
        <button
            onClick={handleToggle}
            className={`flex items-center focus:outline-none ${isToggled ? 'bg-blue-500' : 'bg-gray-400'} p-1 rounded-full`}
        >
            <div
                className={`transform transition-transform duration-200 ${isToggled ? 'translate-x-6' : 'translate-x-0'} bg-white w-6 h-6 rounded-full`}
            />
            <span className="ml-2 text-blue-500">Guardar tarjeta</span>
        </button>
    );
};

export default ToggleSwitch;
