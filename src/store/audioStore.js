import { create } from 'zustand';

export const useAudioStore = create((set, get) => ({
  isPlaying: false,
  currentSong: null,
  currentMusic: { playlist: null, song: null, songs: [], allSongsData: [] },
  audio: new Audio(),
  isHiddenPlayer: false,

  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setAudio: (audio) => set({ audio }),
  setCurrentSong: (song) => set(state => {
    const allSongsData = state.currentMusic.allSongsData;
    const updatedSong = allSongsData.find(item => item.song_id === song.song_id) || song;
    return {
      currentMusic: {
        ...state.currentMusic,
        song: updatedSong
      }
    };
  }),
  setCurrentMusic: (currentMusic) => set({ currentMusic }),
  setIsHiddenPlayer: (isHiddenPlayer) => set({ isHiddenPlayer }),

  playNextSong: () => {
    const { currentMusic, audio, setCurrentSong, setIsPlaying } = get();
    const currentIndex = currentMusic.allSongsData.findIndex(song => song.song_id === currentMusic.song.song_id);
    if (currentIndex === -1) return; // No se encontró la canción actual

    const nextIndex = (currentIndex + 1) % currentMusic.allSongsData.length;
    const nextSong = currentMusic.allSongsData[nextIndex];

    if (nextSong) {
      audio.src = nextSong.audio;
      setCurrentSong(nextSong);
      setIsPlaying(true);
      audio.play();
    }
  },

  playPreviousSong: () => {
    const { currentMusic, audio, setCurrentSong, setIsPlaying } = get();
    const currentIndex = currentMusic.allSongsData.findIndex(song => song.song_id === currentMusic.song.song_id);
    if (currentIndex === -1) return; // No se encontró la canción actual

    const prevIndex = (currentIndex - 1 + currentMusic.allSongsData.length) % currentMusic.allSongsData.length;
    const prevSong = currentMusic.allSongsData[prevIndex];

    if (prevSong) {
      audio.src = prevSong.audio;
      setCurrentSong(prevSong);
      setIsPlaying(true);
      audio.play();
    }
  }
}));
