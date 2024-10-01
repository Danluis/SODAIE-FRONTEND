import { useNavigate } from 'react-router-dom';

export default function ButtonRegister({ text }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/RegisterPageV1');
    };

    return (
        <button
            onClick={handleClick}
            aria-label="Registrarse"  // Mejora SEO y accesibilidad
            className="
                w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 
                rounded-xl text-semiWhite font-semibold 
                shadow-lg transition-transform transform 
                hover:scale-105 hover:text-white cursor-pointer 
                text-xs sm:text-base md:text-lg lg:text-xl
            "
        >
            {text}
        </button>
    );
}
