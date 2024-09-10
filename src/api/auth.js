import axios from './axios';

//AUTHENTICATION APIS
export const registerRequest = user => axios.post(`/register`, user);
export const loginRequest = user => axios.post(`/login`, user);
export const googleLoginRequest = user => axios.post(`/googleLogin`, user);
export const request_password_reset_with_code = email => axios.post(`/request_password_reset_with_code`, email);
export const update_passwordRequest = user => axios.post(`/update_password`, user);
export const facebookLoginRequest = user => axios.post(`/facebookLogin`, user);
export const logoutRequest = user => axios.post(`/logout`, user);

//CREDENTIALS API
export const updateCredentialRequest = (id, updatedCredential) => axios.put(`/credentials/${id}`, updatedCredential);
export const apiGetCredential = credentialId => axios.get(`/credentials/${credentialId}`);

//USER API
export const updateUserRequest = (id, updatedCredential) => axios.put(`/users/${id}`, updatedCredential);
export const apiGetUser = userId => axios.get(`/users/${userId}`);

//SONG API
export const apiCreateSong = song => axios.post(`/songs`, song);
export const apiGetSongs = () => axios.get(`/songs`);
export const apiGetSong = songId => axios.get(`/songs/${songId}`);

//PLAYLIST API
export const apiCreatePlaylists = playlists => axios.post(`/playlists`, playlists);
export const apiCreateSongPlaylists = playlists => axios.post(`/song_playlists`, playlists);


//LIBRARY API
export const apiGetLibrary = user_id => axios.get(`/libraries/${user_id}`)
export const apiAddPlaylistToLibrary = (playlistLibrary) => axios.post(`playlist_libraries`, playlistLibrary)
export const apiAddSongToLibrary = (addSongToLibrary) => axios.post(`/song_libraries`, addSongToLibrary)
export const apiRemoveSongFromLibrary = (removeSongFromLibrary) => axios.delete(`/song_libraries`, {
    data: removeSongFromLibrary
});

