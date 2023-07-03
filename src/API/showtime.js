import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BACKEND_API;

const showtime = {
  addShowTime: async ({ ...data }) => {
    const url = API_BASE_URL + "/showtime/addShowTime";
    return await axios.post(url, data);
  },

  getShowtime: async ({ idFilm }) => {
    const url = API_BASE_URL + `/showtime/${idFilm}`;
    return await axios.get(url);
  },
  showTime: async ({ idShowTime }) => {
    const url = API_BASE_URL + `/showtime/showtime/${idShowTime}`;
    return await axios.get(url);
  },
  edit: async ({ ...showtime }) => {
    const url = API_BASE_URL + `/showtime/${showtime._id}`;
    return await axios.put(url, showtime);
  },
  delete: async ({ id }) => {
    const url = API_BASE_URL + `/showtime/${id}`;
    return await axios.delete(url);
  },
};

export default showtime;
