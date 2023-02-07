import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://food-order-app-58b1f-default-rtdb.firebaseio.com",
});

export const request = async ({ ...options }) => {
  const onSuccess = (response) => response;
  const onError = (error) => {
    console.log(error);
  };

  try {
    const response = await axiosInstance(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};
