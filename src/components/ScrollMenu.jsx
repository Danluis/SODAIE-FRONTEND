import { useFormContext } from 'react-hook-form';

export default function ScrollMenu({ text, placeholder, options, name }) {
    const { register } = useFormContext();

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">{text}</label>
            <select
                {...register(name)}
                className="w-[28rem] px-6 py-3 rounded-lg mt-1 bg-semiBlack border-blue-600 text-white"
            >
                <option value="" disabled selected>{placeholder}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
