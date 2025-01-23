import Joi from 'joi';

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
    experience: Joi.array().items(
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
            
        }),
    ).optional(),
    profile: Joi.array().items(
        Joi.object({
            fileName: Joi.string().required(),
            fileURL: Joi.string().uri().required()
        }).optional(),
    ),
});