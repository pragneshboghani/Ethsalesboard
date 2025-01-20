import { developerValidationSchema } from "../validation/developerValidation.js";
import { developer } from "../utils/resMessage.js";
import { DeveloperModel } from "../model/developer.model.js";
import { DEVELOPER_STATUS } from "../utils/constant.js";

export const addDeveloper = async (req, res) => {
/* #swagger.tags = ['Developer']
   #swagger.description = 'Endpoint to add a new developer.'
   #swagger.parameters['body'] = {
       in: 'body',
       description: 'Developer data',
       required: true,
       schema: { $ref: '#/components/schemas/developerSchema' }
   }
   #swagger.responses[200] = {
       description: 'Developer added successfully.',
       schema: {
           message: 'Developer created successfully.',
           data: { $ref: '#/components/schemas/developerSchema' }
       }
   }
   #swagger.responses[400] = {
       description: 'Invalid input data.',
       schema: { $ref: '#/components/schemas/errorResponse400' }
   }
   #swagger.responses[500] = {
       description: 'Internal server error.',
       schema: { $ref: '#/components/schemas/errorResponse500' }
   }
*/
  try {
    const validationResult = validation.validateParamsWithJoi(
      req.body,
      developerValidationSchema
    );

    if (!validationResult.isValid) {
      return res.badRequest({
        message: validationResult.message,
      });
    }
    const data = validationResult.value;

    const developerData = new DeveloperModel({
      ...data,
    });
    await developerData.save();
    return res.success({
      message: developer.newDeveloper,
      data: developerData,
    });
  } catch (error) {
    return res.internalServerError({
      message: error.message,
    });
  }
};

export const getDeveloperList = async (req, res) => {
  // #swagger.tags = ['Developer']
  try {
    const developerList = await DeveloperModel.find({
      status: DEVELOPER_STATUS.ACTIVE,
    });
    return res.success({
      message: developer.fetchDeveloperList,
      data: developerList,
    });
  } catch (error) {
    return res.internalServerError({
      message: error.message,
    });
  }
};

export const getDeveloperProfile = async (req, res) => {
  // #swagger.tags = ['Developer']
  try {
    const developerDetails = await DeveloperModel.find({
      status: DEVELOPER_STATUS.ACTIVE,
    });
    return res.success({
      message: developer.fetchDeveloperData,
      data: developerDetails,
    });
  } catch (error) {
    return res.internalServerError({
      message: error.message,
    });
  }
};

export const editDeveloper = async (req, res) => {
  // #swagger.tags = ['Developer']
  try {
    return res.success({
      message: developer.editDeveloper,
    });
  } catch (error) {
    return res.internalServerError({
      message: error.message,
    });
  }
};

export const deleteDeveloper = async (req, res) => {
  // #swagger.tags = ['Developer']
  try {
    return res.success({
      message: developer.deleteDeveloper,
    });
  } catch (error) {
    return res.internalServerError({
      message: error.message,
    });
  }
};
