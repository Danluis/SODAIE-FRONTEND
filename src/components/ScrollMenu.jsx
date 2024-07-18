import React from 'react';

export default function ScrollMenu({ text, options }) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">{text}</label>
            <select className="w-[28rem] px-6 py-3 rounded-lg mt-1 bg-semiBlack border-blue-600 text-white h-40 overflow-y-scroll">
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
