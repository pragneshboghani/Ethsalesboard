import {
  developerValidationSchema,
  documentValidationSchema,
} from "../validation/developerValidation.js";
import { developer } from "../utils/resMessage.js";
import { DeveloperModel } from "../model/developer.model.js";
import { DEVELOPER_STATUS } from "../utils/constant.js";
import { validation } from "../utils/common.js";
import { unlink } from "node:fs";
import { DOCModel } from "../model/document.model.js";
import mongoose from "mongoose";

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
    // const validationResult = validation.validateParamsWithJoi(
    //   req.body,
    //   developerValidationSchema
    // );

    const { error, value } = developerValidationSchema.validate(req?.body);

    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }
    const developerData = await DeveloperModel.create(value);

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
    const developerList = await DeveloperModel.aggregate([
      {
        $lookup: {
          from: "documents",
          // The collection to join (documents)
          let: {
            developerId: "$_id",
          },
          // Declare the variable for the developerId in the current document
          pipeline: [
            {
              // Step 2: Use the variable (developerId) to filter documents for the current developer
              $match: {
                $expr: {
                  $eq: ["$developerId", "$$developerId"],
                },
              },
            },
            {
              // Step 3: Group the documents by docCategory
              $group: {
                _id: "$docCategory",
                // Group by docCategory
                documents: {
                  $push: "$$ROOT",
                }, // Push the whole document into the documents array
              },
            },
            {
              $sort: {
                _id: -1,
              },
            },
          ],
          as: "developerDocs", // The result will be stored in the developerDocs array
        },
      },
      {
        $addFields: {
          documents: {
            $arrayToObject: [
              {
                // This converts the developerDocs array of objects to key-value pairs
                $map: {
                  input: "$developerDocs",
                  as: "doc",
                  in: {
                    k: "$$doc._id",
                    v: "$$doc.documents", // Value is the documents array for that category
                  },
                },
              },
            ],
          },
        },
      },
      {
        $project: {
          developerDocs: 0,
        },
      },
    ]);
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
    const developerProfile = await DeveloperModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req?.params?.id),
        },
      },
      {
        $lookup: {
          from: "documents",
          // The collection to join (documents)
          let: {
            developerId: "$_id",
          },
          // Declare the variable for the developerId in the current document
          pipeline: [
            {
              // Step 2: Use the variable (developerId) to filter documents for the current developer
              $match: {
                $expr: {
                  $eq: ["$developerId", "$$developerId"],
                },
              },
            },
            {
              // Step 3: Group the documents by docCategory
              $group: {
                _id: "$docCategory",
                // Group by docCategory
                documents: {
                  $push: "$$ROOT",
                }, // Push the whole document into the documents array
              },
            },
            {
              $sort: {
                _id: -1,
              },
            },
          ],
          as: "developerDocs", // The result will be stored in the developerDocs array
        },
      },
      {
        $addFields: {
          documents: {
            $arrayToObject: [
              {
                // This converts the developerDocs array of objects to key-value pairs
                $map: {
                  input: "$developerDocs",
                  as: "doc",
                  in: {
                    k: "$$doc._id",
                    v: "$$doc.documents", // Value is the documents array for that category
                  },
                },
              },
            ],
          },
        },
      },
      {
        $project: {
          developerDocs: 0,
        },
      },
    ]);
    return res.status(200).json({
      message: developer.fetchDeveloperData,
      data: developerProfile[0],
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
        message: "Validation failed",
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
      return res.status(404).json({ message: "Developer not found." });
    }

    return res.status(200).json({
      message: "Developer fully updated successfully.",
      data: updatedDeveloper,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "An unexpected error occurred.",
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
        message: "Validation failed",
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
      return res.status(404).json({ message: "Developer not found." });
    }

    return res.status(200).json({
      message: "Developer partially updated successfully.",
      data: updatedDeveloper,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "An unexpected error occurred.",
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

export const developerDocument = async (req, res) => {
  /*#swagger.tags = ['Developer']
    #swagger.description = {
       in: 'body',
       description: 'Fields to update',
       required: true,
       schema: { 
           $ref: '#/components/schemas/developerSchema' 
       }
    }
    */

  try {
    const customObject = {
      ...req.body,
      docPath: `/uploads/${req.file.filename}`,
    };
    if (req?.file?.fileName) {
      req.body["docPath"] = `uploads/${req.file.filename}`;
    }
    console.log(customObject);
    const { error, value } = documentValidationSchema.validate(customObject, {
      abortEarly: false,
    });

    if (error) {
      unlink(req.file.path, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err.message}`);
        }
      });
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const developerDocs = await DOCModel.create(value);

    // console.log(req.files);
    // console.log(req.body);
    const developerProfile = await DeveloperModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(developerDocs?.developerId),
        },
      },
      {
        $lookup: {
          from: "documents",
          // The collection to join (documents)
          let: {
            developerId: "$_id",
          },
          // Declare the variable for the developerId in the current document
          pipeline: [
            {
              // Step 2: Use the variable (developerId) to filter documents for the current developer
              $match: {
                $expr: {
                  $eq: ["$developerId", "$$developerId"],
                },
              },
            },
            {
              // Step 3: Group the documents by docCategory
              $group: {
                _id: "$docCategory",
                // Group by docCategory
                documents: {
                  $push: "$$ROOT",
                }, // Push the whole document into the documents array
              },
            },
            {
              $sort: {
                _id: -1,
              },
            },
          ],
          as: "developerDocs", // The result will be stored in the developerDocs array
        },
      },
      {
        $addFields: {
          documents: {
            $arrayToObject: [
              {
                // This converts the developerDocs array of objects to key-value pairs
                $map: {
                  input: "$developerDocs",
                  as: "doc",
                  in: {
                    k: "$$doc._id",
                    v: "$$doc.documents", // Value is the documents array for that category
                  },
                },
              },
            ],
          },
        },
      },
      {
        $project: {
          developerDocs: 0,
        },
      },
    ]);
    return res.status(200).json({
      message: developer.uploadDoc,
      data: developerProfile[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
