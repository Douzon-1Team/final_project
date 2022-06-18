import axios from 'axios';

export const getPost = id =>
    axios.get(`http://localhost:8080/${id}`);
