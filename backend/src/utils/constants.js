const HTTP_STATUS = {
  BAD_REQUEST: 400,
  CREATED: 201,
  CONFLICT: 409,
  NOT_FOUND: 404,
  OK: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
};

const API_MESSAGES = {
  AUTHENTICATION_REQUIRED: "Authentication is required.",
  BOOKMARK_ALREADY_EXISTS: "Video is already bookmarked.",
  BOOKMARK_CREATED_SUCCESS: "Video bookmarked successfully.",
  BOOKMARK_NOT_FOUND: "Bookmark not found.",
  BOOKMARK_REMOVED_SUCCESS: "Bookmark removed successfully.",
  BOOKMARKS_FETCH_SUCCESS: "Bookmarks fetched successfully.",
  EMAIL_ALREADY_EXISTS: "A user with this email already exists.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  INVALID_TOKEN: "Invalid authentication token.",
  COMMENT_CREATED_SUCCESS: "Comment created successfully.",
  COMMENT_DELETED_SUCCESS: "Comment deleted successfully.",
  COMMENT_NOT_FOUND: "Comment not found.",
  COMMENTS_FETCH_SUCCESS: "Comments fetched successfully.",
  FORBIDDEN_ACTION: "You are not authorized to perform this action.",
  LIKE_ALREADY_EXISTS: "Video is already liked by this user.",
  LIKE_CREATED_SUCCESS: "Video liked successfully.",
  LIKE_NOT_FOUND: "Like not found for this user and video.",
  LIKE_REMOVED_SUCCESS: "Like removed successfully.",
  LOGIN_SUCCESS: "Login successful.",
  REGISTRATION_SUCCESS: "User registered successfully.",
  TOKEN_EXPIRED: "Authentication token has expired.",
  USER_FETCH_SUCCESS: "Authenticated user fetched successfully.",
  USERNAME_ALREADY_EXISTS: "A user with this username already exists.",
  VALIDATION_ERROR: "Required fields are missing or invalid.",
  VIDEO_CREATED_SUCCESS: "Video created successfully.",
  VIDEO_FETCH_SUCCESS: "Video fetched successfully.",
  VIDEO_NOT_FOUND: "Video not found.",
  VIDEOS_FETCH_SUCCESS: "Videos fetched successfully.",
  HEALTH_CHECK_SUCCESS: "Backend service is healthy.",
  INTERNAL_SERVER_ERROR: "Internal server error.",
};

const ENVIRONMENTS = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
  TEST: "test",
};

module.exports = {
  API_MESSAGES,
  ENVIRONMENTS,
  HTTP_STATUS,
};
