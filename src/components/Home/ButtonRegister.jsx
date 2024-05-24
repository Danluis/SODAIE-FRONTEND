import { useNavigate } from 'react-router-dom';

export default function ButtonRegister ({text}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/RegisterPageV1');
    };
    return(
        <button
            onClick={handleClick}
            className="px-6 py-2 rounded-xl text-semiWhite font-semibold shadow-lg hover:text-white transition-transform transform hover:scale-105 cursor-pointer">
            {text}
        </button>
    )
}