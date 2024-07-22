import { useEffect, useState } from "react";
import { useAudioStore } from "../../store/audioStore";
import { Play, Pause } from "../MediaPlayer/AudioPlayer";
import { apiGetSongs } from "../../api/auth";

export default function CardPlayButton({ id }) {
  const [audioUrl, setAudioUrl] = useState(null);
  const [song, setSong] = useState(null);
  const [allSongsData, setAllSongsData] = useState([]);

  const {
    currentMusic,
    isPlaying,
    setIsPlaying,
    setCurrentMusic,
    audio,
    setIsHiddenPlayer,
    playNextSong,
  } = useAudioStore(state => state);

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist?.id === id;

  useEffect(() => {
    async function fetchData() {
      const { data } = await apiGetSongs();
      const song = data.find(song => song.song_id === id);
      setAudioUrl(song.audio);
      setSong(song);
      setAllSongsData(data); // Actualiza allSongsData

    }

    fetchData();
  }, [id]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("ended", playNextSong); // Añade el evento ended
    }
    return () => {
      if (audio) {
        audio.removeEventListener("ended", playNextSong); // Limpia el evento ended
      }
    };
  }, [audio, playNextSong]);

  const handleClick = async () => {
    if (isPlayingPlaylist) {
      audio.pause();
      setIsPlaying(false);
      setIsHiddenPlayer(true);
      console.log(isPlayingPlaylist);
      return;
    }

    if (audioUrl) {
      if (audio.src !== audioUrl) {
        audio.src = audioUrl;
        setIsHiddenPlayer(true);
        await audio.load();
      }

      setCurrentMusic({ playlist: { id }, song: song, songs: [song], allSongsData });
      setIsPlaying(true);
      setIsHiddenPlayer(true);
      await audio.play();
    }
  };

  return (
    <button onClick={handleClick} className="p-3 bg-cyan-700 absolute right-4 transition-transform transform hover:scale-105 rounded-full">
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  );
}
