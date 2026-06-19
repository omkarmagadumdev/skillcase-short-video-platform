import api from "./axios";
import getErrorMessage from "./getErrorMessage";

export const fetchComments = async (videoId) => {
  try {
    const response = await api.get(`/comments/${videoId}`);
    return response.data.data.comments;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const createComment = async (videoId, content) => {
  try {
    const response = await api.post(`/comments/${videoId}`, { content });
    return response.data.data.comment;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
