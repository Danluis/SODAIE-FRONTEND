import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación
import { apiGetLibrary } from "../../api/auth";

export default function SeasonalMusicCard({ title, searchTerm }) {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Crea el hook para navegación

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await apiGetLibrary(1); // Obtenemos las playlists del usuario con user_id = 1
        console.log("Fetched library:", response.data);

        if (response.data && response.data.Playlist_Libraries) {
          // Filtrar solo playlists con user_id = 1
          const playlistData = response.data.Playlist_Libraries.map(
            (pl) => pl.Playlist
          ).filter((playlist) => playlist.user_id === 1); // Filtra las playlists del usuario con id 1

          setPlaylists(playlistData);
          console.log(playlistData);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching playlists:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  const handleRowClick = (playlistId) => {
    navigate(`/PlaylistSongsCard/${playlistId}`); // Redirige a la ruta especificada
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchTerm || "")
  );

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4 text-white cursor-pointer hover:text-semiWhite">
          {title}
        </h2>
      </div>
      <div className="flex w-full gap-4 overflow-x-auto py-2 scrollbar-hidden">
        {filteredPlaylists.map((playlist) => (
          <div
            key={playlist.playlist_id}
            onClick={() => handleRowClick(playlist.playlist_id)} // Redirige cuando se hace clic en una tarjeta
            className="min-w-max max-w-[14rem] w-[100px] relative flex flex-col mb-16 h-min-height py-2 bg-transparent cursor-pointer overflow-x-auto p-3 rounded-lg hover:bg-gray-800 hover:shadow-lg"
          >
            <img
              className="w-full max-w-[10rem] h-[10rem] object-cover rounded-lg mx-auto" // Centra la imagen
              src={playlist.cover}
              alt={playlist.name}
            />
            <span className="mt-2 font-semibold text-center">
              {playlist.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
