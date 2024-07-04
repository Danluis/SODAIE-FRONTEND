import { useEffect, useState } from "react";
import { useAudioStore } from "../../store/audioStore";
import { Play, Pause } from "../MediaPlayer/AudioPlayer";
import { apiGetSong } from "../../api/auth";

export default function CardPlayButton({ id }) {
  const [audioUrl, setAudioUrl] = useState(null);
  const [song, setSong] = useState(null)
  const {
    currentMusic,
    isPlaying,
    setIsPlaying,
    setCurrentMusic,
    audio,
    setAudio
  } = useAudioStore(state => state);

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist?.id === id;

  useEffect(() => {
    async function fetchData() {
      const song = await apiGetSong(id);
      const { audio } = song.data;
      setAudioUrl(audio);
      setSong(song.data); // Update to set the full song data
    }

    fetchData();
  }, [id]);

  const handleClick = async () => {
    if (isPlayingPlaylist) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    if (audioUrl) {
      if (audio.src !== audioUrl) {
        audio.src = audioUrl;
        await audio.load(); // Ensure the audio is loaded
      }

      setCurrentMusic({ playlist: { id }, song: song, songs:[song] }); // Pass the full song data
      setIsPlaying(true);
      await audio.play();
    }
  };

  return (
    <button onClick={handleClick} className="p-3 bg-cyan-700 absolute right-4 transition-transform transform hover:scale-105 rounded-full">
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  );
}
