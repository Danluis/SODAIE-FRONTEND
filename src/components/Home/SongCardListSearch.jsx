import { useEffect, useState } from "react";
import SongCard from "./SongCardV1";
import { apiGetSongs } from "../../api/auth";

export default function SongCardListSearch({ title, userId, search }) {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar el tamaño de la pantalla para ajustar el número de canciones que se muestran
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Móvil si la pantalla es menor o igual a 768px
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Comprobar el tamaño de la pantalla al cargar el componente

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await apiGetSongs();
        
        // Filtrar canciones según el userId y el parámetro de búsqueda
        const filteredSongs = response.data.filter((song) => {
          // Filtrar por userId si se proporciona
          const matchesUserId = userId ? song.user_id === Number(userId) : true;
          // Filtrar por título de canción
          const matchesSearch = song.title.toLowerCase().includes(search.toLowerCase());
          
          return matchesUserId && matchesSearch;
        });

        setSongs(filteredSongs);
      } catch (error) {
        setError(error);
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [userId, search]); // Añadido 'search' como dependencia

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Determinar cuántas canciones mostrar según el tamaño de la pantalla
  const displayedSongs = isMobile ? songs.slice(0, 10) : songs.slice(0, 5);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <span className="text-2xl font-bold mb-4 text-white cursor-pointer hover:text-semiWhite">
          {title}
        </span>
      </div>
      {displayedSongs.length === 0 ? ( // Comprobación si no hay canciones
        <div className="text-white text-center">No hay {title} relacionadas a tu busqueda</div> // Mensaje cuando no hay canciones
      ) : (
        <div className="flex w-full gap-6 md:grid-cols-3 lg:grid-cols-4 overflow-x-auto py-2 scrollbar-hidden">
          {displayedSongs.map((song) => (
            <SongCard
              key={song.song_id}
              img={song.cover}
              title={song.title}
              artists={song.composers}
              id={song.song_id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
