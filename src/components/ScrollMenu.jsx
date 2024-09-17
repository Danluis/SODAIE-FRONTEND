import { useFormContext } from 'react-hook-form';

export default function ScrollMenu({ text, placeholder, options, name, isRequired = false }) {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="mb-4">
            <label 
                htmlFor={name} 
                className="block text-sm font-medium text-gray-400 mb-2"
            >
                {text}<span className="text-red-500">*</span>
            </label>
            <select
                id={name}
                {...register(name, { required: isRequired && `${text} es requerido` })}
                className={`w-full max-w-md px-4 py-2 rounded-lg mt-1 bg-semiBlack border ${errors[name] ? 'border-red-600' : 'border-blue-600'} text-white focus:outline-none focus:ring-2 ${errors[name] ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                aria-label={text}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
            )}
        </div>
    );
}
