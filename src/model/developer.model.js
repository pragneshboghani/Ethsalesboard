import mongoose from "mongoose";
import { DEVELOPER_STATUS } from "../utils/constant.js";

export const developerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileCode: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    currentPosition: {
      type: String,
    },
    expeditedSalary: {
      type: String,
    },
    education: [
      {
        instituteName: String,
        degree: String,
        fieldOfStudy: String,
        startYear: String,
        endYear: String,
      },
    ],
    experience: [
      {
        companyName: String,
        jobTitle: String,
        startDate: String,
        endDate: String,
        description: String,
        salary: String,
        resignationDate: String,
        resignReason: String,
        noticePeriod: String,
      },
    ],
    profile: [
      {
        fileName: String,
        fileURL: String,
      },
    ],
    status: {
      type: String,
      enum: Object.values(DEVELOPER_STATUS),
      default: DEVELOPER_STATUS.REGISTERED,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const DeveloperModel = mongoose.model("developers", developerSchema);
