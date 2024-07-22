import { useNavigate } from "react-router-dom";
import CardPlayButton from "../MediaPlayer/CardPlayButton";

export default function SongCard({ img, title, artists, id }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/Artist');
    };

    const handlePlayClick = (e) => {
        e.stopPropagation(); // Evita que el evento de clic se propague al contenedor principal
        // Llama a la función de reproducción de la canción
        // Por ejemplo, podrías usar una función que esté en un contexto o en una tienda de estado global
    };

    const maxArtistsToShow = 3; 
    const displayedArtists = artists.slice(0, maxArtistsToShow);
    const remainingArtists = artists.length - maxArtistsToShow;

    return (
        <div 
            onClick={handleNavigate} 
            className="w-[14rem] relative flex flex-col mb-16 h-min-height py-2 bg-transparent cursor-pointer p-3 rounded-lg hover:bg-gray-800 hover:shadow-lg"
        >
            <img 
                className="w-full h-[10rem] object-cover rounded-lg" 
                src={img} 
                alt={title} 
            />
            <span className="mt-2 font-semibold">{title}</span>
            
            <div className="text-white mt-2">
                <div className="text-semiWhite line-clamp-2">
                    {displayedArtists.join(', ')}
                    {remainingArtists > 0 && ', y más'}
                </div>
            </div>
            <div 
                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
            >
                <div onClick={handlePlayClick}>
                    <CardPlayButton id={id} />
                </div>
            </div>
        </div>
    );
}
