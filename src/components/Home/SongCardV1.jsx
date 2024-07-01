import { useNavigate } from "react-router-dom";
import CardPlayButton from "../MediaPlayer/CardPlayButton";

export default function SongCard({ img, title, artists, id }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/Artist');
    };

    const handlePlayClick = (e) => {
        e.stopPropagation(); // Evita que el evento de clic se propague al contenedor principal
        // Lógica adicional para manejar la reproducción de la canción
    };

    return (
        <div onClick={handleNavigate} className="w-[14rem] relative flex flex-col mb-16 h-min-height py-2 bg-transparent cursor-pointer p-3 rounded-lg hover:bg-gray-800 hover:shadow-lg">
            <img className="w-full h-[10rem] object-cover rounded-lg" src={img} alt={title} />
            <div className="text-white mt-2">
                {
                artists.map((artist, index) => (
                    <div key={index}>
                        {artist}
                        {index < artists.length - 1 && <br />} {/* Añade un salto de línea excepto después del último compositor */}
                    </div>
                ))
                }
            </div>
            <span className="text-semiWhite text-sm">{title}</span>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div onClick={handlePlayClick}>
                    <CardPlayButton id={id} />
                </div>
            </div>
        </div>
    );
}
