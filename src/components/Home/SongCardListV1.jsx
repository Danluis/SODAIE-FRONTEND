import { useEffect, useState } from "react";
import SongCard from "./SongCardV1";
import ShowMore from "./ShowMore";
import { apiGetSongs } from "../../api/auth";

export default function SongCardList({ title, userId }) {
  // userId es opcional
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await apiGetSongs();
        const filteredSongs = userId
          ? response.data.filter((song) => song.user_id === Number(userId))
          : response.data;
        setSongs(filteredSongs);
      } catch (error) {
        setError(error);
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <span className="text-2xl font-bold mb-4 text-white cursor-pointer hover:text-semiWhite">
          {title}
        </span>
      </div>
      <div className="flex gap-6 md:grid-cols-3 lg:grid-cols-4 rounded-xl py-2">
        {songs.map((song) => (
          <SongCard
            key={song.song_id}
            img={song.cover}
            title={song.title}
            artists={song.composers}
            id={song.song_id}
          />
        ))}
        <div className="relative top-10 right-8">
          <ShowMore />
        </div>
      </div>
    </div>
  );
}
