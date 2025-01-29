import Joi from "joi";

export const mailValidationSchema = Joi.object({
  subTitle: Joi.string().required().messages({
    "string.empty": "Subtitle is required.",
    "any.required": "Subtitle is required.",
  }),
  html: Joi.string().required().messages({
    "any.required": "HTML is required.",
  }),
  skill: Joi.string().required().messages({
    "string.empty": "Skill is required.",
    "any.required": "Skill is required.",
  }),
  Note: Joi.string().optional().allow("").messages({
    "string.base": "Note must be a string.",
  }),
});
                                                                              