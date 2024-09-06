import { useFormContext } from 'react-hook-form';

export default function ScrollMenu({ text, placeholder, options, name }) {
    const { register } = useFormContext();

    return (
        <div className="mb-4">
            <label 
                htmlFor={name} 
                className="block text-sm font-medium text-gray-400 mb-2"
            >
                {text}
            </label>
            <select
                id={name}
                {...register(name)}
                className="w-full max-w-md px-4 py-2 rounded-lg mt-1 bg-semiBlack border-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={text}
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
