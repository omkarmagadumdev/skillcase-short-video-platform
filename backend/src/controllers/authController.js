const authService = require("../services/authService");
const { API_MESSAGES, HTTP_STATUS } = require("../utils/constants");
const createAppError = require("../utils/createAppError");

const normalizeString = (value) => (typeof value === "string" ? value.trim() : "");

const register = async (request, response, next) => {
  try {
    const username = normalizeString(request.body.username);
    const email = normalizeString(request.body.email).toLowerCase();
    const password = normalizeString(request.body.password);

    if (!username || !email || !password) {
      return next(createAppError(API_MESSAGES.VALIDATION_ERROR, HTTP_STATUS.BAD_REQUEST));
    }

    const user = await authService.registerUser({ email, password, username });

    return response.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: API_MESSAGES.REGISTRATION_SUCCESS,
      data: {
        user,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (request, response, next) => {
  try {
    const email = normalizeString(request.body.email).toLowerCase();
    const password =
      typeof request.body.password === "string" ? request.body.password.trim() : "";

    if (!email || !password) {
      return next(createAppError(API_MESSAGES.VALIDATION_ERROR, HTTP_STATUS.BAD_REQUEST));
    }

    const result = await authService.loginUser({ email, password });

    return response.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.LOGIN_SUCCESS,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

const me = async (request, response, next) => {
  try {
    const user = await authService.getAuthenticatedUser(request.user.id);

    return response.status(HTTP_STATUS.OK).json({
      success: true,
      message: API_MESSAGES.USER_FETCH_SUCCESS,
      data: {
        user,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
  me,
  register,
};
