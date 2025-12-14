import axios from "axios";

export const createOrder = (orderData) => {
  return axios.post(
    "http://localhost:5000/api/orders/create",
    orderData
  );
};
