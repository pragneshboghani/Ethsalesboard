import mongoose from "mongoose";
import { mailValidationSchema } from "../validation/mailValidation.js";
import { MailModel } from "../model/mail.model.js";
import { mail } from "../utils/resMessage.js";

export const addMail = async (req, res) => {
  try {
    const { error, value } = mailValidationSchema.validate(req?.body);

    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }
    const developerData = await MailModel.create(value);

    return res.status(200).json({
      message: mail.newDeveloper,
      data: developerData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getMailList = async (req, res) => {
  // #swagger.tags = ['Developer']
  try {
    const developerList = await MailModel.find({});
    return res.status(200).json({
      message: mail.fetchDeveloperList,
      data: developerList,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateMail = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = mailValidationSchema.validate(req?.body, {
      abortEarly: false,
      allowUnknown: true, // Allow partial updates
    });
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }
    const mailData = await MailModel.findByIdAndUpdate(id,value,{ new: true, runValidators: true });

    return res.status(200).json({
      message: mail.updateMail,
      data: mailData,
    });
  
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
