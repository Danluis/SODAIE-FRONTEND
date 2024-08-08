import axios from 'axios';

// Instancia de axios para la API externa
const externalApi = axios.create({
  baseURL: 'https://api.digital.gob.do/v3',
  headers: {
    'accept': 'application/json'
  }
});

export default externalApi;
