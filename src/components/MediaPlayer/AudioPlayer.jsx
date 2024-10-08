import { useEffect, useState } from 'react';
import { useAudioStore } from "../../store/audioStore.js";
import { IoMdClose } from "react-icons/io";
import { FaStepBackward, FaStepForward } from "react-icons/fa";
import { IoMdVolumeHigh, IoMdVolumeLow, IoMdVolumeOff } from "react-icons/io";
import { SongControl } from './SongControl.jsx';
import { CurrentSong } from './CurrentSong.jsx';
import Slider from "./Slider";

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

export function AudioPlayer() {
  const { isPlaying, setIsPlaying, audio, currentMusic, isHiddenPlayer, setIsHiddenPlayer, playNextSong, playPreviousSong } = useAudioStore(state => state);
  const [volume, setVolume] = useState(audio.volume * 100);
  const [isMuted, setIsMuted] = useState(false);
  const volumeMultiplier = 1; // Ajusta este valor para aumentar el volumen

  useEffect(() => {
    if (currentMusic.song) {
      audio.src = currentMusic.song.audio;
      audio.load(); // Asegúrate de que el audio se cargue
      audio.addEventListener('canplaythrough', handleCanPlayThrough);
  
      // Cleanup event listener
      return () => {
        audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      };
    }
  }, [currentMusic.song, audio]);
  

  useEffect(() => {
    if (isMuted) {
      audio.muted = true;
    } else {
      audio.muted = false;
      audio.volume = volume / 100 * volumeMultiplier;
    }
  }, [isMuted, volume, audio]);

  const handleCanPlayThrough = () => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
    audio.removeEventListener('canplaythrough', handleCanPlayThrough);
  };

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

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const getVolumeIcon = () => {
    if (isMuted) return <IoMdVolumeOff className='w-5 h-5 text-gray-300 hover:text-gray-400 cursor-pointer' onClick={toggleMute} />;
    if (volume === 0) return <IoMdVolumeOff className='w-5 h-5 text-gray-300 hover:text-gray-400 cursor-pointer' onClick={toggleMute} />;
    if (volume <= 30) return <IoMdVolumeLow className='w-5 h-5 text-gray-300 hover:text-gray-400 cursor-pointer' onClick={toggleMute} />;
    if (volume <= 70) return <IoMdVolumeHigh className='w-5 h-5 text-gray-300 hover:text-gray-400 cursor-pointer' onClick={toggleMute} />;
    return <IoMdVolumeHigh className='w-5 h-5 text-gray-300 hover:text-gray-400 cursor-pointer' onClick={toggleMute} />;
  };

  const handleClose = () => {
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setIsHiddenPlayer(false);
  };

  return (
    <div className={`${isHiddenPlayer ? 'sm:bottom-0 bottom-20 fixed h-[5.5rem] w-full z-20' : 'block'  }`}>
      <div className={`${isHiddenPlayer ? 'bg-black p-4 relative md:bottom-0 bottom-[1.9rem]' : 'hidden left-[40rem]'} `}>
      <div className='flex items-center flex-row justify-between w-full px-4 z-50 text-white sm:p-0 pt-4'>
        
        <IoMdClose className='w-5 h-5 absolute top-3 right-3 cursor-pointer hover:text-semiWhite' onClick={handleClose} />
        <div className='w-1/3 h-full'>
        
          {currentMusic.song ? <CurrentSong {...currentMusic.song} /> : "No song playing"}
        </div>

        <div className="w-1/3 grid place-content-center items-center flex-1">
          <div className="flex justify-center items-center gap-2 sm:mt-0">
            <button className="rounded-full p-2" onClick={playPreviousSong}>
              <FaStepBackward className='w-6 h-5 text-gray-300 hover:text-gray-400' />
            </button>
            <button className="bg-white rounded-full p-2 mx-2" onClick={handleClick}>
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <button className="rounded-full p-2" onClick={playNextSong}>
              <FaStepForward className='w-6 h-5 text-gray-300 hover:text-gray-400' />
            </button>
          </div>
          <SongControl audio={audio} smHidden={true} />
        </div>

        <div className='w-1/3 flex items-center justify-end'>
          <div className="w-[95px] flex items-center">
            <div className='relative top-1'>
              {getVolumeIcon()}
            </div>
            <Slider 
              min={0}
              max={100}
              value={volume}
              onChange={handleVolumeChange}
              className="slider w-full ml-2"
            />
          </div>
        </div>
        </div>
        <div className='sm:hidden block'>
        <SongControl audio={audio} smHidden={false} />

        </div>

      </div>
    </div>
  );
}
