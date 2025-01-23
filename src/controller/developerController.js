import { developerValidationSchema } from "../validation/developerValidation.js";
import { developer } from "../utils/resMessage.js";
import { DeveloperModel } from "../model/developer.model.js";
import { DEVELOPER_STATUS } from "../utils/constant.js";
import { validation } from "../utils/common.js";

export const addDeveloper = async (req, res) => {
  /* 
   #swagger.tags = ['Developer']
   #swagger.description = 'Endpoint to add a new developer.'
   #swagger.parameters['body'] = {
       in: 'body',
       description: 'Developer data',
       required: true,
       schema: { 
           $ref: '#/components/schemas/developerSchema' 
       }
   }
   #swagger.responses[200] = {
       description: 'Developer added successfully.',
       schema: {
           type: 'object',
           properties: {
               message: { type: 'string', example: 'Developer created successfully.' },
               data: { $ref: '#/components/schemas/developerSchema' }
           }
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
      return res.status(400).json({
        message: validationResult.message,
      });
    }
    const data = validationResult.value;
    const developerData = await DeveloperModel.create(data);
    
    return res.status(200).json({
      message: developer.newDeveloper,
      data: developerData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getDeveloperList = async (req, res) => {
  // #swagger.tags = ['Developer']
  try {
    const developerList = await DeveloperModel.find();
    return res.status(200).json({
      message: developer.fetchDeveloperList,
      data: developerList,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getDeveloperProfile = async (req, res) => {
  // #swagger.tags = ['Developer']
  try {
    const developerDetails = await DeveloperModel.find();
    return res.status(200).json({
      message: developer.fetchDeveloperData,
      data: developerDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateDeveloperPut = async (req, res) => {
  /* 
   #swagger.tags = ['Developer']
   #swagger.description = 'Endpoint to fully update a developer.'
   #swagger.parameters['id'] = {
       in: 'path',
       description: 'Unique identifier of the developer',
       required: true,
       schema: { type: 'string', example: '64ab2cd098ab3e12345f6789' }
   }
   #swagger.parameters['body'] = {
       in: 'body',
       description: 'Complete developer data',
       required: true,
       schema: { 
           $ref: '#/components/schemas/developerSchema' 
       }
   }
*/

  const { id } = req.params;
  const updates = req.body;

  try {
    // Validate entire request body
    const { error, value } = developerValidationSchema.validate(updates, {
      abortEarly: false, // Collect all validation errors
    });

    if (error) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.details.map((detail) => detail.message),
      });
    }

    // Replace the developer data
    const updatedDeveloper = await DeveloperModel.findByIdAndUpdate(
      id,
      value,
      { new: true, runValidators: true } // Overwrite ensures full replacement  overwrite: true,
    );

    if (!updatedDeveloper) {
      return res.status(404).json({ message: 'Developer not found.' });
    }

    return res.status(200).json({
      message: 'Developer fully updated successfully.',
      data: updatedDeveloper,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'An unexpected error occurred.',
    });
  }
};
export const updateDeveloperPatch = async (req, res) => {
  /* 
   #swagger.tags = ['Developer']
   #swagger.description = 'Endpoint to partially update a developer.'
   #swagger.parameters['id'] = {
       in: 'path',
       description: 'Unique identifier of the developer',
       required: true,
       schema: { type: 'string', example: '64ab2cd098ab3e12345f6789' }
   }
   #swagger.parameters['body'] = {
       in: 'body',
       description: 'Fields to update',
       required: true,
       schema: { 
           $ref: '#/components/schemas/developerSchema' 
       }
   }
*/

  const { id } = req.params;
  const updates = req.body;

  try {
    // Validate partial updates (allow unknown for patch updates)
    const { error, value } = developerValidationSchema.validate(updates, {
      abortEarly: false,
      allowUnknown: true, // Allow partial updates
    });

    if (error) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.details.map((detail) => detail.message),
      });
    }

    // Update only the specified fields
    const updatedDeveloper = await DeveloperModel.findByIdAndUpdate(
      id,
      value,
      { new: true, runValidators: true } // No overwrite, only update fields
    );

    if (!updatedDeveloper) {
      return res.status(404).json({ message: 'Developer not found.' });
    }

    return res.status(200).json({
      message: 'Developer partially updated successfully.',
      data: updatedDeveloper,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'An unexpected error occurred.',
    });
  }
};

export const deleteDeveloper = async (req, res) => {
  // #swagger.tags = ['Developer']
  try {
    return res.status(200).json({
      message: developer.deleteDeveloper,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
