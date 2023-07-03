import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BACKEND_API;

const bill = {
  addBill: async ({ ...data }) => {
    const url = API_BASE_URL + "/bill/addBill";
    return await axios.post(url, data);
  },
  getBill: async ({ idTicket }) => {
    const url = API_BASE_URL + `/bill/${idTicket}`;
    return await axios.get(url);
  },
};

export default bill;
