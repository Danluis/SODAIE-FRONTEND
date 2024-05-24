import { useNavigate } from 'react-router-dom';

export default function LoginButtonHeader({ text }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/LoginPageV1');
    };

    return (
        <button
            onClick={handleClick}
            className="px-6 py-2 rounded-3xl text-black bg-white font-semibold shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
        >
            {text}
        </button>
    );
}
