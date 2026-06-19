export const validateRequiredFields = (fields) => {
  return fields.every((field) => field && field.trim() !== "");
};
