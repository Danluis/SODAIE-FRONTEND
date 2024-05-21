export default function LoginButton({text}){
    return(
        <button className="px-6 py-2 rounded-3xl text-black bg-white font-semibold shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
            {text}
        </button>
    )
}