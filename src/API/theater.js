import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BACKEND_API;

const theater = {
  addTheater: async ({ ...data }) => {
    const url = API_BASE_URL + "/theater/addTheater";
    return await axios.post(url, data);
  },
  getTheaterById: async ({ idArea }) => {
    const url = API_BASE_URL + `/theater/${idArea}`;
    return await axios.get(url);
  },
  getTheater: async (idTheater) => {
    const url = API_BASE_URL + `/theater/getId/${idTheater}`;
    return await axios.get(url);
  },
  editTheater: async ({ ...theater }) => {
    const url = API_BASE_URL + `/theater/${theater._id}`;
    return await axios.put(url, theater);
  },
  deleteTheater: async ({ index }) => {
    const url = API_BASE_URL + `/theater/${index}`;
    return await axios.delete(url);
  },
};

export default theater;
