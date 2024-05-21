export default function ButtonRegister ({text}) {
    return(
        <button className="px-6 py-2 rounded-xl text-semiWhite font-semibold shadow-lg hover:text-white transition-transform transform hover:scale-105 cursor-pointer">
            {text}
        </button>
    )
}