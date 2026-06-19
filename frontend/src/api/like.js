import api from "./axios";
import getErrorMessage from "./getErrorMessage";

export const likeVideo = async (videoId) => {
  try {
    const response = await api.post(`/likes/${videoId}`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const unlikeVideo = async (videoId) => {
  try {
    const response = await api.delete(`/likes/${videoId}`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
