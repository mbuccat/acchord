const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3001'
  : 'https://acchord.herokuapp.com';

export default API_URL;
