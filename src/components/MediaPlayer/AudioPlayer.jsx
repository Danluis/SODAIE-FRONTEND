import { useEffect, useState } from 'react';
import { useAudioStore } from "../../store/audioStore.js";
import Slider from "./Slider";  // Asegúrate de ajustar la ruta si es necesario

export const Play = () => (
  <svg data-encore-id="icon" role="img" height={16} width={16} aria-hidden="true" viewBox="0 0 16 16">
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
  </svg>
);

export const Pause = () => (
  <svg data-encore-id="icon" role="img" height={16} width={16} aria-hidden="true" viewBox="0 0 16 16">
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
);

const CurrentSong = ({ cover, title, composers }) => {
  return (
    <div className="flex items-center gap-5 relative overflow-hidden">
      <div className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
        <img src={cover} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="text-white">
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-gray-400 text-sm">{composers.join(', ')}</div>
      </div>
    </div>
  );
};

const SongControl = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = () => {
    setCurrentTime(audio.currentTime);
  };

  const handleSeek = (event) => {
    audio.currentTime = event.target.value;
  };

  useEffect(() => {
    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [audio]);

  return (
    <div className="flex items-center justify-center gap-2 w-full">
      <span className='text-sm text-semiWhite font-semibold mr-4 w-12 text-center'>{formatTime(currentTime)}</span>
      <Slider
        min={0}
        max={audio.duration || 0}
        value={currentTime}
        onChange={handleSeek}
        className="w-[450px]"
      />
      <span className='text-sm text-semiWhite font-semibold w-12 text-center'>{formatTime(audio.duration)}</span>
    </div>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export function AudioPlayer() {
  const { isPlaying, setIsPlaying, audio, currentMusic } = useAudioStore(state => state);
  const [volume, setVolume] = useState(audio.volume * 100);
  const volumeMultiplier = 2; // Ajusta este valor para aumentar el volumen

  const handleClick = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    audio.volume = Math.min(newVolume / 100 * volumeMultiplier, 1);
    setVolume(newVolume);
  };

  useEffect(() => {
    const updateVolume = () => {
      setVolume(audio.volume * 100 / volumeMultiplier);
    };
    audio.addEventListener('volumechange', updateVolume);
    return () => {
      audio.removeEventListener('volumechange', updateVolume);
    };
  }, [audio]);

  return (
    <div className="bg-black p-4 flex items-center flex-row justify-between w-full px-4 z-50 text-white">
        
        <div className='w-1/3 h-full'>
          {currentMusic.song ? <CurrentSong {...currentMusic.song} /> : "No song playing"}
        </div>

      <div className="w-1/3 grid place-content-center items-center flex-1">
        <div className="flex justify-center">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
        <SongControl audio={audio}/>

      </div>
    <div className='w-1/3 flex justify-end'>
      <div className="w-[95px]">
          <Slider 
            min={0}
            max={100}
            value={volume}
            onChange={handleVolumeChange}
            className="slider"
          />
        </div>
    </div>

    </div>
  );
}
