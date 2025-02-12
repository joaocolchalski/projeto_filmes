//Base URL da API do TMDB: https://api.themoviedb.org/3
//URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=ff93ea414d798f8bd23cfbf8a6d64855&language=pt-BR

import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3"
});

export default api;