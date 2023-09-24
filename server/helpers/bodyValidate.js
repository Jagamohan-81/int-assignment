const { join } = require("bluebird");
const Joi = require("joi");
const { as } = require("pg-promise");
module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const { value, error } = schema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        let err_msg = {};
        for (let counter in error.details) {
          let k = error.details[counter].context.key;
          let val = error.details[counter].message;
          err_msg[k] = val;
        }
        // console.log("eror", err_msg);
        return res.status(400).json({ status: 400, errors: err_msg });
      }

      // console.log(req.value);
      if (!req.value) {
        req.value = {};
      }
      req.value = value;

      next();
    };
  },

  schemas: {
    userRegistraionSchema: Joi.object({
      name: Joi.string().min(3).max(30).required().messages({
        "string.base": "Username should be a string",
        "string.empty": "Username is required",
        "string.min": "Username should be at least {#limit} characters long",
        "string.max": "Username should not exceed {#limit} characters",
        "any.required": "Username is required",
      }),
      email: Joi.string()
        .email({ tlds: { allow: true } }) // Validate email format
        .required()
        .messages({
          "string.base": "Email should be a string",
          "string.empty": "Email is required",
          "string.email": "Invalid email format",
          "any.required": "Email is required",
        }),
      password: Joi.string()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
          )
        )
        .required()
        .messages({
          "string.base": "Password should be a string",
          "string.empty": "Password is required",
          "string.pattern.base":
            "Password must have at least 8 characters, with one of ,lowercase letter,uppercase letter,digit,special character",
          "any.required": "Password is required",
        }),
      role: Joi.string().required().messages({
        "string.base": "Role should be a string",
        "string.empty": "Role is required",
        "any.required": "Role is required",
      }),
    }),
    userLoginSchema: Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: true } }) // Validate email format
        .required()
        .messages({
          "string.base": "Email should be a string",
          "string.empty": "Email is required",
          "string.email": "Invalid email format",
          "any.required": "Email is required",
        }),
      password: Joi.string()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
          )
        )
        .required()
        .messages({
          "string.base": "Password should be a string",
          "string.empty": "Password is required",
          "string.pattern.base":
            "Password must have at least 8 characters, with one of ,lowercase letter,uppercase letter,digit,special character",
          "any.required": "Password is required",
        }),
    }),
  },
};
