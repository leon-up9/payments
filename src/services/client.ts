import axios from "axios";
import { getToken } from "./token";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL
    : "http://localhost:3333";

axios.interceptors.request.use(function (config) {
  const token = getToken();
  const newConfig = {
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      ...config.params,
      authToken: token,
    },
  };
  return newConfig;
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    return Promise.reject(err?.response?.data);
  }
);

const api = {
  getToken: async () => {
    const res = await axios.get(`${apiUrl}/auth-tokens`);
    return res.data.token;
  },

  createPayment: async (data: any) => {
    const res = await axios.post(`${apiUrl}/payments`, data);
    return res.data;
  },

  getPayments: async (referenceId: string = "") => {
    const res = await axios.get(`${apiUrl}/payments`, {
      params: {
        referenceId,
      },
    });
    return res.data;
  },

  getPayment: async (id: string) => {
    const res = await axios.get(`${apiUrl}/payments/${id}`);
    return res.data;
  },
};

export default api;
