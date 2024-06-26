import { useFormContext } from "react-hook-form";

export default function FormInput({ text, placeholder, name }) {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="mb-4">
            <span className="block bg-transparent px-1 mb-1 text-sm font-semibold text-gray-400">
                {text}
            </span>
            <input
                {...register(name, { required: true })}
                type="text"
                placeholder={placeholder}
                className="w-[28rem] px-6 py-3 rounded-lg mt-1 bg-semiBlack border-blue-600 text-white"
            />
            {errors[name] && (
                <p className="text-red-500 mb-4">Campo es requerido</p>
            )}
        </div>
    );
}
