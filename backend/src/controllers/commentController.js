const commentService = require("../services/commentService");
const { API_MESSAGES, HTTP_STATUS } = require("../utils/constants");
const createAppError = require("../utils/createAppError");

const parsePositiveInteger = (value) => {
  const num = Number(value);

  if (!Number.isInteger(num) || num <= 0) {
    throw createAppError(API_MESSAGES.VALIDATION_ERROR, HTTP_STATUS.BAD_REQUEST);
  }

  return num;
};

const create = async (request, response, next) => {
  try {
    const videoId = parsePositiveInteger(request.params.videoId);
    let { content } = request.body;

    if (typeof content !== "string") {
      throw createAppError(API_MESSAGES.VALIDATION_ERROR, HTTP_STATUS.BAD_REQUEST);
    }

    content = content.trim();

    if (content.length === 0 || content.length > 500) {
      throw createAppError(API_MESSAGES.VALIDATION_ERROR, HTTP_STATUS.BAD_REQUEST);
    }

    const comment = await commentService.createComment({
      userId: request.user.id,
      videoId,
      content,
    });

    return response.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: API_MESSAGES.COMMENT_CREATED_SUCCESS,
      data: {
        comment,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getAllForVideo = async (request, response, next) => {
  try {
    const videoId = parsePositiveInteger(request.params.videoId);

    const comments = await commentService.getCommentsByVideoId(videoId);

    return response.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.COMMENTS_FETCH_SUCCESS,
      data: {
        comments,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const commentId = parsePositiveInteger(request.params.commentId);

    await commentService.deleteComment({
      userId: request.user.id,
      commentId,
    });

    return response.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.COMMENT_DELETED_SUCCESS,
      data: {},
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  getAllForVideo,
  remove,
};
