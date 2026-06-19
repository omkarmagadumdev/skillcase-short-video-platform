const bookmarkService = require("../services/bookmarkService");
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

    await bookmarkService.createBookmark({
      userId: request.user.id,
      videoId,
    });

    return response.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: API_MESSAGES.BOOKMARK_CREATED_SUCCESS,
      data: {
        bookmark: { videoId, userId: request.user.id },
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const bookmarks = await bookmarkService.getBookmarks(request.user.id);

    return response.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.BOOKMARKS_FETCH_SUCCESS,
      data: {
        bookmarks,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const videoId = parsePositiveInteger(request.params.videoId);

    await bookmarkService.removeBookmark({
      userId: request.user.id,
      videoId,
    });

    return response.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.BOOKMARK_REMOVED_SUCCESS,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  getAll,
  remove,
};
