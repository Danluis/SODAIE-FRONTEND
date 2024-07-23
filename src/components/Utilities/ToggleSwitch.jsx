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
            className={`relative w-12 h-6 flex items-center ${isToggled ? 'bg-blue-500' : 'bg-gray-400'} rounded-full p-1 duration-300 ease-in-out`}
        >
            <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isToggled ? 'translate-x-6' : 'translate-x-0'}`}
            />
        </button>
    );
};

export default ToggleSwitch;
