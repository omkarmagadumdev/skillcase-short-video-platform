const videoService = require("../services/videoService");
const { API_MESSAGES, HTTP_STATUS } = require("../utils/constants");
const createAppError = require("../utils/createAppError");

const normalizeString = (value) => (typeof value === "string" ? value.trim() : "");

const parseVideoId = (value) => {
  const videoId = Number(value);

  if (!Number.isInteger(videoId) || videoId <= 0) {
    throw createAppError(API_MESSAGES.VALIDATION_ERROR, HTTP_STATUS.BAD_REQUEST);
  }

  return videoId;
};

const validateVideoPayload = (body) => {
  const title = normalizeString(body.title);
  const description = normalizeString(body.description);
  const category = normalizeString(body.category);
  const filePath = normalizeString(body.file_path);

  if (!title || !description || !category || !filePath) {
    throw createAppError(API_MESSAGES.VALIDATION_ERROR, HTTP_STATUS.BAD_REQUEST);
  }

  return {
    category,
    description,
    filePath,
    title,
  };
};

const create = async (request, response, next) => {
  try {
    const videoPayload = validateVideoPayload(request.body);
    const video = await videoService.createVideo(videoPayload);

    return response.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: API_MESSAGES.VIDEO_CREATED_SUCCESS,
      data: {
        video,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const videos = await videoService.getAllVideos(request.user.id);

    return response.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.VIDEOS_FETCH_SUCCESS,
      data: {
        videos,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getById = async (request, response, next) => {
  try {
    const videoId = parseVideoId(request.params.id);
    const video = await videoService.getVideoById(videoId);

    return response.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.VIDEO_FETCH_SUCCESS,
      data: {
        video,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
};
