import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BACKEND_API;

const category = {
  addCategory: async ({ ...data }) => {
    const url = API_BASE_URL + "/category/addCategory";
    return await axios.post(url, data);
  },
  getCategoryList: async () => {
    const url = API_BASE_URL + "/category/getList";
    return await axios.get(url);
  },
  deleteCategory: async ({ nameCategory }) => {
    const url = API_BASE_URL + `/category/${nameCategory}`;
    return await axios.delete(url);
  },
};

export default category;
