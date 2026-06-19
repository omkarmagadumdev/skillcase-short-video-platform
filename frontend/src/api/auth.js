import api from "./axios";

const getErrorMessage = (error) =>
  error.response?.data?.message ??
  error.message ??
  "An unexpected error occurred.";

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
