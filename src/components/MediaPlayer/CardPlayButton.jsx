import { useEffect, useState } from "react";
import { useAudioStore } from "../../store/audioStore";
import { Play, Pause } from "../MediaPlayer/AudioPlayer";
import { apiGetSongs, apiGetSongPlaylistSongs } from "../../api/auth";

export default function CardPlayButton({ songId, playlistId }) {
  const [audioUrl, setAudioUrl] = useState(null);
  const [song, setSong] = useState(null);

  const {
    currentMusic,
    isPlaying,
    setIsPlaying,
    setCurrentMusic,
    audio,
    setIsHiddenPlayer,
    playNextSong,
    currentPlaylistId,
    setCurrentPlaylistId,
  } = useAudioStore((state) => state);

  const isPlayingCurrentSong = isPlaying && currentMusic?.song?.song_id === songId;
  const isPlayingCurrentPlaylist = isPlaying && currentPlaylistId === playlistId;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await apiGetSongs();
        const songIdNumber = Number(songId); // Convertir id a número
        const song = data.find(song => song.song_id === songIdNumber);

        if (song) {
          setAudioUrl(song.audio);
          setSong(song);
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    }

    fetchData();
  }, [songId]);

  useEffect(() => {
    if (audio) {
      const handleEnded = () => playNextSong();
      audio.addEventListener("ended", handleEnded);
      return () => {
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [audio, playNextSong]);

  const handleClick = async () => {
    if (!audio) return;

    // Si la canción ya está en reproducción y se pausa
    if (isPlayingCurrentSong && (!playlistId || isPlayingCurrentPlaylist)) {
      audio.pause();
      setIsPlaying(false);
      setIsHiddenPlayer(true);
      if (playlistId) {
        setCurrentPlaylistId(null); // Vaciar currentPlaylistId si se pausa
      }
      return;
    }

    let allSongsData = [];

    try {
      if (playlistId) {
        // Obtener las canciones de la playlist
        const response = await apiGetSongPlaylistSongs(playlistId);
        allSongsData = response.data.Song_Playlists.map(sp => sp.Song);
      } else {
        // Obtener todas las canciones si no hay playlistId
        const response = await apiGetSongs();
        allSongsData = response.data;
      }

      // Si se reproduce una nueva canción
      if (audioUrl) {
        if (audio.src !== audioUrl) {
          try {
            audio.src = audioUrl;
            setIsHiddenPlayer(true);
            await audio.load();
            await audio.play();
          } catch (error) {
            console.error('Error playing audio:', error);
          }
        }

        setCurrentMusic({
          playlist: playlistId ? { id: playlistId } : null,
          song,
          songs: [song],
          allSongsData, // Actualizamos allSongsData aquí
        });

        if (playlistId) {
          setCurrentPlaylistId(playlistId);
        } else {
          setCurrentPlaylistId(null);
        }

        setIsPlaying(true);
        setIsHiddenPlayer(true);
        audio.play()
      }
    } catch (error) {
      console.error('Error fetching playlist songs:', error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="p-3 bg-cyan-700 absolute right-4 transition-transform transform hover:scale-105 rounded-full"
    >
      {isPlayingCurrentSong && (!playlistId || isPlayingCurrentPlaylist) ? <Pause /> : <Play />}
    </button>
  );
}
