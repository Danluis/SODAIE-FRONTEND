import { useState } from 'react';
import { FiPlus, FiCheck } from 'react-icons/fi'; // Usamos react-icons para los íconos

const FollowButton = () => {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollowClick = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <button
            onClick={handleFollowClick}
            className={`flex items-center justify-center bg-gray-500 text-white px-4 py-1 rounded transition-all duration-300 ease-in-out hover:bg-blue-500 ${
                isFollowing ? 'bg-green-500' : ''
            }`}
        >
            {isFollowing ? <FiCheck className="animate-bounce" /> : <FiPlus />}
        </button>
    );
};

export default FollowButton;
