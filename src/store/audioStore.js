import { create } from 'zustand';

export const useAudioStore = create((set) => ({
  isPlaying: false,
  currentSong: null,
  currentMusic: { playlist: null, song: null, songs: []},
  audio: new Audio('./src/components/MediaPlayer/01.mp3'),
  setIsPlaying: (isPlaying) => set({isPlaying}),
  setAudio: (audio) => set({audio}),
  setCurrentSong: (song) => set({ currentSong: song }),
  setCurrentMusic: (currentMusic) => set({ currentMusic }),
}));
