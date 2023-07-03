import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BACKEND_API;

const movie = {
  addfilm: async ({ ...data }) => {
    const url = API_BASE_URL + "/movie/addfilm";
    return await axios.post(url, data);
  },
  getMovieList: async () => {
    const url = API_BASE_URL + "/movie/getList";
    return await axios.get(url);
  },
  getMovie: async ({ idFilm }) => {
    const url = API_BASE_URL + `/movie/${idFilm}`;
    return await axios.get(url);
  },
  editMovie: async ({ ...movie }) => {
    const url = API_BASE_URL + `/movie/${movie._id}`;
    return await axios.put(url, movie);
  },
  deleteMovie: async ({ nameFilm }) => {
    const url = API_BASE_URL + `/movie/${nameFilm}`;
    return await axios.delete(url);
  },
};

export default movie;
