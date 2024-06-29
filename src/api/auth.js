import axios from './axios';

//AUTHENTICATION APIS
export const registerRequest = user => axios.post(`/register`, user);
export const loginRequest = user => axios.post(`/login`, user);
export const logoutRequest = user => axios.post(`/logout`, user);

//CREDENTIALS API
export const updateCredentialRequest = (id, updatedCredential) => axios.put(`/credentials/${id}`, updatedCredential);

//USER API
export const updateUserRequest = (id, updatedCredential) => axios.put(`/users/${id}`, updatedCredential);

//SONG API
export const apiCreateSong = song => axios.post(`/songs`, song);
