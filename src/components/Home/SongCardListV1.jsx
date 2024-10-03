import { useEffect, useState } from "react";
import SongCard from "./SongCardV1";
import { apiGetSongs } from "../../api/auth";

export default function SongCardList({ title, userId, type }) {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        let response;

        if (type === "recentlyPlayed") {
          response = await apiGetSongs();
          const shuffledSongs = response.data.sort(() => 0.5 - Math.random());
          setSongs(shuffledSongs.slice(0, 1));
        } else if (type === "recentlyUploaded") {
          response = await apiGetSongs();
          const currentDate = new Date();
          const recentSongs = response.data.filter((song) => {
            const createdAt = new Date(song.createdAt);
            const daysDifference =
              (currentDate - createdAt) / (1000 * 3600 * 24);
            return daysDifference <= 3;
          });
          setSongs(recentSongs);
        } else if (type === "seasonalMusic") {
          response = await apiGetSongs();
          // Ordenar por número de likes de mayor a menor
          const seasonalSongs = response.data.sort((a, b) => b.likes - a.likes);
          setSongs(seasonalSongs.slice(0, 10)); // Mostrar las 10 canciones con más likes
        } else {
          response = await apiGetSongs();
          setSongs(response.data);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [userId, type]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const displayedSongs = isMobile ? songs.slice(0, 10) : songs.slice(0, 5);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <span className="text-2xl font-bold mb-4 text-white cursor-pointer hover:text-semiWhite">
          {title}
        </span>
      </div>
      <div className="flex w-full gap-6 overflow-x-auto py-2 scrollbar-hidden">
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
    </div>
  );
}
