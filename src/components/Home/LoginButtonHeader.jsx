import { useNavigate } from 'react-router-dom';

export default function LoginButtonHeader({ text }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/LoginPageV1');
    };

    return (
        <button
            onClick={handleClick}
            aria-label="Iniciar sesión" // Mejora para accesibilidad y SEO
            className="
                w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 
                rounded-3xl text-black bg-white font-semibold 
                shadow-lg transition-transform transform 
                hover:scale-105 cursor-pointer 
                text-xs sm:text-base md:text-lg lg:text-xl
                "
        >
            {text}
        </button>
    );
}
