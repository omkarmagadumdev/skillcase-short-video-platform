import api from "./axios";

const getErrorMessage = (error) =>
  error.response?.data?.message ??
  error.message ??
  "An unexpected error occurred.";

export const fetchVideos = async () => {
  try {
    const response = await api.get("/videos");
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
