import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BACKEND_API;

const user = {
  register: async ({ ...data }) => {
    const url = API_BASE_URL + "/auth/register";
    return await axios.post(url, data);
  },

  login: async (data) => {
    const url = API_BASE_URL + "/auth/login";
    return await axios.post(url, data);
  },
  logout: async () => {
    const url = API_BASE_URL + "/auth/logout";
    return await axios.post(url, undefined, { withCredentials: true });
  },
  getUserList: async ({ token }) => {
    const url = API_BASE_URL + "/user/getList";
    return await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getUser: async ({ idUser }) => {
    const url = API_BASE_URL + `/user/getUser/${idUser}`;
    return await axios.get(url);
  },
  editUser: async (user) => {
    const url = API_BASE_URL + `/user/${user._id}`;
    return await axios.put(url, user);
  },
  deleteUser: async ({ email, token }) => {
    const url = API_BASE_URL + `/user/${email}`;
    return await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default user;
