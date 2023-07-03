import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BACKEND_API;

const ticket = {
  addTicket: async ({ ...data }) => {
    const url = API_BASE_URL + "/ticket/addTicket";
    return await axios.post(url, data);
  },
  getTicket: async ({email}) => {
    const url = API_BASE_URL + `/ticket/${email}`;
    return await axios.get(url);
  },
  checkoutTicket: async ({ id }) => {
    const url = API_BASE_URL + `/ticket/${id}`;
    return await axios.put(url, ticket);
  },
  
};

export default ticket;
