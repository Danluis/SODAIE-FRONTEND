export default function FormInput({text,placeholder}){
    return(
        <div className="mb-4">
            <span className="block bg-transparent px-1 mb-1 text-sm font-semibold text-gray-400">
                {text}
            </span>
            <input
                type="text"
                placeholder={placeholder}
                className="w-[28rem] px-6 py-3 rounded-lg mt-1 bg-semiBlack border-blue-600 text-white"
            />
        </div>
    )
}