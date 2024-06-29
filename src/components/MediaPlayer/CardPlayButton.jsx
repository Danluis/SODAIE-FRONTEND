import {useAudioStore} from "../../store/audioStore";
import { Play,Pause } from "../MediaPlayer/AudioPlayer";

export default function CardPlayButton({ id }){

    const {
        currentMusic,
        isPlaying,
        setIsPlaying,
        setCurrentMusic
    } = useAudioStore(state => state);

    const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id == id


    const handleClick = () =>{
        if(isPlayingPlaylist) {
            setIsPlaying(false)
            return
        }
        setCurrentMusic({
            playlist: {
                id
            }
        })
        setIsPlaying(!isPlaying)
    }


    return(
        <button onClick={handleClick} className="p-3 bg-cyan-700 absolute right-4 bottom-16 transition-transform transform hover:scale-105 rounded-full" >
            {isPlayingPlaylist ? <Pause /> : <Play />}
        </button>
    )
}