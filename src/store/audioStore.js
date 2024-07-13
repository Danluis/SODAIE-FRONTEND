import { create } from 'zustand';

export const useAudioStore = create((set) => ({
  isPlaying: false,
  currentSong: null,
  currentMusic: { playlist: null, song: null, songs: [] },
  audio: new Audio(),
  isHiddenPlayer: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setAudio: (audio) => set({ audio }),
  setCurrentSong: (song) => set({ currentSong: song }),
  setCurrentMusic: (currentMusic) => set({ currentMusic }),
  setIsHiddenPlayer: (isHiddenPlayer) => set({ isHiddenPlayer })
}));
