import Joi from "joi";
import { DOC_CATEGORIES } from "../utils/constant.js";

export const developerValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  mobileCode: Joi.string().required(),
  mobileNumber: Joi.string().required(),
  currentPosition: Joi.string().required(),
  expeditedSalary: Joi.string().required(),
  education: Joi.array().items(
    Joi.object({
      instituteName: Joi.string().required(),
      degree: Joi.string().required(),
      fieldOfStudy: Joi.string().required(),
      startYear: Joi.string().required(),
      endYear: Joi.string().required(),
    }).optional()
  ),
  experience: Joi.array()
    .items(
      Joi.object({
        companyName: Joi.string().required(),
        jobTitle: Joi.string().required(),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        description: Joi.string().optional().allow(""),
        salary: Joi.string().optional().allow(""),
        resignationDate: Joi.string().optional().allow(""),
        resignReason: Joi.string().optional().allow(""),
        noticePeriod: Joi.string().optional().allow(""),
      })
    )
    .optional(),
  profile: Joi.array().items(
    Joi.object({
      fileName: Joi.string().required(),
      fileURL: Joi.string().uri().required(),
    }).optional()
  ),
});

//document

// Extracting valid categories and subcategories from DOC_CATEGORIES
const docCategories = Object.values(DOC_CATEGORIES).map((cat) =>
  typeof cat === "object" ? cat.name : cat
);

const docSubCategories = Object.values(DOC_CATEGORIES)
  .filter((cat) => typeof cat === "object")
  .flatMap((cat) => Object.values(cat.subcategories));

export const documentValidationSchema = Joi.object({
  developerId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "developerId must be a valid ObjectId.",
      "any.required": "developerId is required.",
    }),

  docPath: Joi.string().uri().required(),

  docCategory: Joi.string()
    .valid(...docCategories)
    .required(),

  docSubCategory: Joi.string()
    .valid(...docSubCategories)
    .required(), 
});
