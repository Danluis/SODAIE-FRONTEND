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

  const randomMusic = async (allSongs) => {
    const shuffledSongs = allSongs.sort(() => 0.5 - Math.random());
    const randomSongs = shuffledSongs.slice(0, 10);

    localStorage.setItem("recentlyPlayedSongs", JSON.stringify(randomSongs));
    localStorage.setItem("lastUpdateTime", Date.now());

    setSongs(randomSongs);
  };

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await apiGetSongs();
        let filteredSongs = response.data;

        if (userId) {
          filteredSongs = filteredSongs.filter(
            (song) => song.user_id === Number(userId)
          );
        }

        if (type === "recomendedMusic") {
          const lastUpdateTime = localStorage.getItem("lastUpdateTime");
          const currentTime = Date.now();
          const oneDay = 24 * 60 * 60 * 1000;

          if (!lastUpdateTime || currentTime - lastUpdateTime > oneDay) {
            randomMusic(filteredSongs);
          } else {
            const savedSongs = JSON.parse(
              localStorage.getItem("recentlyPlayedSongs")
            );
            setSongs(savedSongs || []); // Manejo de casos donde no hay canciones guardadas
          }
        } else if (type === "recentlyUploaded") {
          const currentDate = new Date();
          const recentSongs = filteredSongs.filter((song) => {
            const createdAt = new Date(song.createdAt);
            const daysDifference =
              (currentDate - createdAt) / (1000 * 3600 * 24);
            return daysDifference <= 3;
          });
          setSongs(recentSongs);
        } else if (type === "seasonalMusic") {
          const seasonalSongs = filteredSongs.sort((a, b) => b.likes - a.likes);
          setSongs(seasonalSongs.slice(0, 10));
        } else {
          setSongs(filteredSongs);
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
