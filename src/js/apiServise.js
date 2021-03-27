import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/';
const API_KEY = 'be8c1fddab60d3ca36450ce7d48f58dd';
 
const url = `${BASE_URL}3/trending/all/day?api_key=${API_KEY}`;

export default function getResponse(query, page) {
    return axios.get(url)
}
    
