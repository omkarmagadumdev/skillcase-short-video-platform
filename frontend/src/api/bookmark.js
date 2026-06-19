import api from "./axios";
import getErrorMessage from "./getErrorMessage";

export const fetchBookmarks = async () => {
  try {
    const response = await api.get("/bookmarks");
    return response.data.data.bookmarks;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const createBookmark = async (videoId) => {
  try {
    const response = await api.post(`/bookmarks/${videoId}`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteBookmark = async (videoId) => {
  try {
    const response = await api.delete(`/bookmarks/${videoId}`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
