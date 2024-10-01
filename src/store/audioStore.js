import { create } from 'zustand';
import { apiGetSongPlaylistSongs, apiGetSongs } from '../api/auth.js';

export const useAudioStore = create((set, get) => ({
  isPlaying: false,
  currentSong: null,
  currentMusic: { playlist: null, song: null, songs: [], allSongsData: [] },
  audio: new Audio(),
  isHiddenPlayer: false,
  currentPlaylistId: null, // Añadido para gestionar el playlist_id

  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setAudio: (audio) => set({ audio }),
  setCurrentMusic: (currentMusic) => set({ currentMusic }),
  setIsHiddenPlayer: (isHiddenPlayer) => set({ isHiddenPlayer }),
  setCurrentPlaylistId: (playlistId) => set({ currentPlaylistId: playlistId }), // Método para establecer el playlist_id

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

  fetchPlaylistSongs: async (playlistId) => {
    try {
      const response = await apiGetSongPlaylistSongs(playlistId);
      const playlistSongs = response.data.Song_Playlists.map(sp => sp.Song);

      set((state) => ({
        currentMusic: {
          ...state.currentMusic,
          allSongsData: playlistSongs,
          playlist: { id: playlistId }
        },
        currentPlaylistId: playlistId // Guardar el playlist_id en el estado
      }));

      return playlistSongs;
    } catch (error) {
      console.error('Error fetching playlist songs:', error);
      return [];
    }
  },

  playNextSong: async () => {
    const { currentMusic, audio, setCurrentSong, setIsPlaying, currentPlaylistId } = get();
    const currentIndex = currentMusic.allSongsData.findIndex(song => song.song_id === currentMusic.song.song_id);
    
    if (currentIndex === -1) return; // No se encontró la canción actual
  
    try {
      let allSongs = currentMusic.allSongsData;
        if (currentPlaylistId) {
          const response = await apiGetSongPlaylistSongs(currentPlaylistId);
          allSongs = response.data.Song_Playlists.map(sp => sp.Song);
          currentMusic.allSongsData= allSongs
          
        } else {
          const response = await apiGetSongs();
          allSongs = response.data;
          currentMusic.allSongsData=allSongs
        }
  
      if (allSongs.length === 0) return;
  
      // Calcular el índice de la siguiente canción
      const nextIndex = (currentIndex + 1) % allSongs.length;
      const nextSong = allSongs[nextIndex];
  
      if (nextSong) {
        audio.pause();
        audio.src = nextSong.audio;
        audio.load();
        setCurrentSong(nextSong);
        setIsPlaying(true);
        audio.play();
      }
    } catch (error) {
      console.error('Error fetching next song:', error);
    }
  },
  

  playPreviousSong: async () => {
    const { currentMusic, audio, setCurrentSong, setIsPlaying, currentPlaylistId } = get();
    const currentIndex = currentMusic.allSongsData.findIndex(song => song.song_id === currentMusic.song.song_id);
    
    if (currentIndex === -1) return; // No se encontró la canción actual
  
    try {
      let allSongs = currentMusic.allSongsData;
  
      // Solo hacer la solicitud si no hay canciones cargadas
      if (!allSongs || allSongs.length === 0) {
        if (currentPlaylistId) {
          const response = await apiGetSongPlaylistSongs(currentPlaylistId);
          allSongs = response.data.Song_Playlists.map(sp => sp.Song);
        } else {
          const response = await apiGetSongs();
          allSongs = response.data;
        }
      }
  
      if (allSongs.length === 0) return;
  
      // Calcular el índice de la canción anterior
      const prevIndex = (currentIndex - 1 + allSongs.length) % allSongs.length;
      const prevSong = allSongs[prevIndex];
  
      if (prevSong) {
        audio.pause();
        audio.src = prevSong.audio;
        audio.load();
        setCurrentSong(prevSong);
        setIsPlaying(true);
        audio.play();
      }
    } catch (error) {
      console.error('Error fetching previous song:', error);
    }
  },
  
  
  
}));
