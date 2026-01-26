import axiosInstance from "../api/axiosInstance";

export const createOrder = (data) => {
  return axiosInstance.post("/orders", data); // ✅ must match backend route
};
