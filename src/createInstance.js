import jwt_decode from "jwt-decode";
import axios from "axios";

const refreshToken = async () => {
  try {
    const BACKEND_API = process.env.REACT_APP_BACKEND_API;
    const res = await axios.post(BACKEND_API + "/auth/refresh", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
