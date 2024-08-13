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

//USER API
export const updateUserRequest = (id, updatedCredential) => axios.put(`/users/${id}`, updatedCredential);

//SONG API
export const apiCreateSong = song => axios.post(`/songs`, song);
export const apiGetSongs = () => axios.get(`/songs`);
export const apiGetSong = songId => axios.get(`/songs/${songId}`);
