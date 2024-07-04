import { useAudioStore } from "../../store/audioStore.js";

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

const CurrentSong = ({ cover, title }) => {
  return (
    <div className="flex items-center gap-5 relative overflow-hidden">
      <div className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
        <img src={cover} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="text-white">
        <div className="text-lg font-semibold">{title}</div>
      </div>
    </div>
  );
};

export function AudioPlayer() {
  const { isPlaying, setIsPlaying, audio, currentMusic } = useAudioStore(state => state);

  const handleClick = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-black p-4 flex flex-row justify-between w-full px-4 z-50 text-white">
      <div>
        {currentMusic.song ? <CurrentSong {...currentMusic.song} /> : "No song playing"}
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
      </div>

      <div>
        Volumen
      </div>
    </div>
  );
}
