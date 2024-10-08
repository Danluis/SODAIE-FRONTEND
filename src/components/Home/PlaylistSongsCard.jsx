import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { apiGetSongPlaylistSongs } from "../../api/auth";
import CardPlayButton from "../../components/MediaPlayer/CardPlayButton";
import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import { useAudioStore } from "../../store/audioStore";

export default function PlaylistSongsCard() {
  const { playlistId } = useParams();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredSongId, setHoveredSongId] = useState(null);
  const [menuVisible, setMenuVisible] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const menuRef = useRef(null);
  const [searchTerm] = useState("");

  useEffect(() => {
    const fetchPlaylistSongs = async () => {
      try {
        const response = await apiGetSongPlaylistSongs(playlistId);
        if (response.data) {
          setPlaylist(response.data);
          console.log(playlist);

          if (response.data.Song_Playlists) {
            const playlistSongs = response.data.Song_Playlists.map(
              (sp) => sp.Song
            );
            setSongs(playlistSongs);
          }
          // Establecer el playlist_id en el store
          useAudioStore.getState().setCurrentPlaylistId(playlistId);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistSongs();
  }, [playlistId]);

  const toggleMenu = (songId, event) => {
    event.stopPropagation();
    setMenuVisible(songId === menuVisible ? null : songId);
  };

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-blackMain">
      <Header />
      <div className="flex-grow">
        <Navbar />
        <div className="p-8 text-white mt-10">
          <div className="w-full max-w-full-xl bg-blackMain rounded-lg shadow-lg overflow-hidden mx-auto">
            <div className="p-6 min-h-[22rem] h-full mb-20">
              <h2 className="text-2xl font-bold mb-6 text-white">
                {playlist ? playlist.name : "Loading Playlist..."}
              </h2>
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error: {error.message}</div>
              ) : (
                <table className="w-full text-left text-semiWhite mb-6">
                  <thead className="bg-secondaryBlack">
                    <tr>
                      <th className="pl-8 pr-4 py-2">#</th>
                      <th className="px-4 py-2">Nombre</th>
                      <th className="px-4 py-2">Compositores</th>
                      <th className="px-4 py-2">Interpretes</th>
                      <th className="px-4 py-2">Duracion</th>
                      <th className="px-4 py-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-blackMain">
                    {filteredSongs.map((song, index) => (
                      <tr
                        key={song.song_id}
                        className="border-t border-semiBlack hover:bg-secondaryBlack"
                        onMouseEnter={() => setHoveredSongId(song.song_id)}
                        onMouseLeave={() => setHoveredSongId(null)}
                      >
                        <td className="px-4 py-2">
                          <div className="relative w-full h-full flex justify-start items-center">
                            {hoveredSongId === song.song_id ? (
                              <div className="absolute left-14 bottom-5">
                                <CardPlayButton playlistId={playlistId} songId={song.song_id} />{" "}
                                {/* Aquí se corrige el envío del songId */}
                              </div>
                            ) : (
                              <div className="absolute left-4">{index + 1}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2 flex items-center gap-2 text-white font-semibold">
                          <div className="relative w-[3rem] h-[3rem]">
                            <img
                              src={song.cover}
                              alt={song.title}
                              className="w-full h-full rounded-md object-cover"
                            />
                          </div>
                          {song.title}
                        </td>
                        <td className="px-4 py-2">
                          {song.composers.join(", ")}
                        </td>
                        <td className="px-4 py-2">
                          {song.interpreters.join(", ")}
                        </td>
                        <td className="px-4 py-2 pl-8">{song.duration}</td>
                        <td className="px-8 py-2">
                          
                          <button className="text-semiWhite hover:text-white text-2xl pl-4">
                            ...
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
