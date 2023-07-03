import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BACKEND_API;

const animation = {
  addAnimation: async ({ ...data }) => {
    const url = API_BASE_URL + "/animation/addAnimation";
    return await axios.post(url, data);
  },
  getList: async () => {
    const url = API_BASE_URL + "/animation/getList";
    return await axios.get(url);
  },
  deleteAnimation: async ({ nameAnimation }) => {
    const url = API_BASE_URL + `/animation/${nameAnimation}`;
    return await axios.delete(url);
  },
};

export default animation;
