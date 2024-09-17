import { useFormContext } from "react-hook-form";

export default function FormInput({ text, placeholder, name, isRequired }) {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="mb-4">
            <label 
                htmlFor={name} 
                className="block bg-transparent px-1 mb-1 text-sm font-semibold text-gray-400"
            >
                {text}
                {isRequired && <span className="text-red-500">*</span>}
            </label>
            <input
                {...register(name, { required: isRequired })}
                type="text"
                id={name}
                placeholder={placeholder}
                className="w-full max-w-xs sm:max-w-sm lg:max-w-md px-6 py-3 rounded-lg mt-1 bg-semiBlack border-blue-600 text-white"
            />
            {errors[name] && isRequired && (
                <p className="text-red-500 mb-4">Campo es requerido</p>
            )}
        </div>
    );
}
