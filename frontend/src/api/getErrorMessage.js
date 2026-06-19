const getErrorMessage = (error) =>
  error.response?.data?.message ??
  error.message ??
  "An unexpected error occurred.";

export default getErrorMessage;
