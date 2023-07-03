import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BACKEND_API;

const area = {
  addArea: async ({ ...data }) => {
    const url = API_BASE_URL + "/area/addArea";
    return await axios.post(url, data);
  },
  getAreaJson: async () => {
    const url = API_BASE_URL + "/area/getAreaJson";
    return await axios.get(url);
  },
  getAreaList: async () => {
    const url = API_BASE_URL + "/area/getList";
    return await axios.get(url);
  },
  deleteArea: async ({ nameArea }) => {
    const url = API_BASE_URL + `/area/${nameArea}`;
    return await axios.delete(url);
  },
};

export default area;
