import mongoose from "mongoose";
import {
    DEVELOPER_STATUS
} from "../utils/constant.js";

export const developerSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileCode: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    currentPosition: {
        type: String,
    },
    resume: [{
        fileName: String,
        fileURL: String,
    }],
    documents: [{
        documentType: String,
        fileName: String,
        fileURL: String,
    }],
    education: [{
        instituteName: String,
        degree: String,
        fieldOfStudy: String,
        startYear: String,
        endYear: String,
    }],
    experience: [{
        companyName: String,
        jobTitle: String,
        startDate: String,
        endDate: String,
        description: String,
    }],
    profile: [{
        fileName: String,
        fileURL: String,
    }],
    status: {
        type: String,
        enum: Object.values(DEVELOPER_STATUS),
        default: DEVELOPER_STATUS.REGISTERED
    }
}, {
    timestamps: true
})

export const DeveloperModel = mongoose.model('developer', developerSchema);