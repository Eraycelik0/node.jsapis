const joi = require("joi");
const APIError = require("../../utils/errors");

class authValidation {
  constructor() {}

  static register = async (req, res, next) => {
    try {
      await joi
        .object({
          name: joi.string().trim().min(3).max(100).required().messages({
            "string.base": "name must be string.",
            "string.min":
              "The name field must consist of at least 3 characters.",
            "string.max": "The name field must contain at most 100 characters.",
            "string.empty": "name is required.",
          }),

          lastname: joi.string().trim().min(3).max(100).required().messages({
            "string.base": "lastname must be string.",
            "string.min":
              "The lastname field must consist of at least 3 characters.",
            "string.max":
              "The lastname field must contain at most 100 characters.",
            "string.empty": "lastname is required.",
          }),

          email: joi.string().email().trim().required().messages({
            "string.base": "Email must be string.",
            "string.empty": "lastname is required.",
            "string.email": "Email field must contain an email",
          }),

          password: joi.string().trim().min(6).max(36).required().messages({
            "string.base": "Password must be string.",
            "string.empty": "Password is required.",
            "string.min":
              "The Password field must consist of at least 6 characters.",
            "string.max":
              "The Password field must contain at most 36 characters.",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      if (error.details && error?.details[0].message) {
        throw new APIError(error.details[0].message, 400);
      } else {
        throw new APIError("", 400);
      }
    }
    next();
  };

  static login = async (req, res, next) => {
    try {
      await joi
        .object({
          email: joi.string().email().trim().required().messages({
            "string.base": "Email must be string.",
            "string.empty": "lastname is required.",
            "string.email": "Email field must contain an email",
          }),

          password: joi.string().trim().min(6).max(36).required().messages({
            "string.base": "Password must be string.",
            "string.empty": "Password is required.",
            "string.min":
              "The Password field must consist of at least 6 characters.",
            "string.max":
              "The Password field must contain at most 36 characters.",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      if (error.details && error?.details[0].message) {
        throw new APIError(error.details[0].message, 400);
      } else {
        throw new APIError("", 400);
      }
    }
    next();
  };
}

module.exports = authValidation;
