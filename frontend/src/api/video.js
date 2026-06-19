import api from "./axios";
import getErrorMessage from "./getErrorMessage";

export const fetchVideos = async () => {
  try {
    const response = await api.get("/videos");
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
