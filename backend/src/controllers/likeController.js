const likeService = require("../services/likeService");
const { API_MESSAGES, HTTP_STATUS } = require("../utils/constants");
const createAppError = require("../utils/createAppError");

const parseVideoId = (value) => {
  const videoId = Number(value);

  if (!Number.isInteger(videoId) || videoId <= 0) {
    throw createAppError(API_MESSAGES.VALIDATION_ERROR, HTTP_STATUS.BAD_REQUEST);
  }

  return videoId;
};

const create = async (request, response, next) => {
  try {
    const videoId = parseVideoId(request.params.videoId);

    await likeService.likeVideo({
      userId: request.user.id,
      videoId,
    });

    return response.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: API_MESSAGES.LIKE_CREATED_SUCCESS,
      data: {},
    });
  } catch (error) {
    return next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const videoId = parseVideoId(request.params.videoId);

    await likeService.unlikeVideo({
      userId: request.user.id,
      videoId,
    });

    return response.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.LIKE_REMOVED_SUCCESS,
      data: {},
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  remove,
};
