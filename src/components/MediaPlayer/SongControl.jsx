import { useState,useEffect } from "react";
import Slider from "./Slider";
export const SongControl = ({ audio }) => {
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
          className="w-[30rem]"
        />
        <span className='text-sm text-semiWhite font-semibold w-12 text-center'>{formatTime(audio.duration || '')}</span>
      </div>
    );
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };