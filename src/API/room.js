import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BACKEND_API;

const room = {
  addRoom: async ({ ...data }) => {
    const url = API_BASE_URL + "/room/addRoom";
    return await axios.post(url, data);
  },
  getRoomById: async ({ idTheater }) => {
    const url = API_BASE_URL + `/room/${idTheater}`;
    return await axios.get(url);
  },
  getId: async ({ idRoom }) => {
    const url = API_BASE_URL + `/room/getId/${idRoom}`;
    return await axios.get(url);
  },
  deleteRoom: async ({ nameRoom }) => {
    const url = API_BASE_URL + `/room/${nameRoom}`;
    return await axios.delete(url);
  },
};

export default room;
