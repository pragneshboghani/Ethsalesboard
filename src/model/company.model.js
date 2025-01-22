import mongoose from "mongoose";

export const companySchema = new mongoose.Schema(
  {
    index: {
      type: Number,
      require: true,
      unique: true,
    },
    categoriesId: { type: mongoose.Schema.Types.ObjectId, ref: "sitemaps" },
    categoriesIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "sitemaps" }],
    page: {
      type: Number,
      require: true,
    },
    companyName: {
      type: String,
      require: true,
    },
    profileLink: {
      type: String,
      default: "",
    },
    websiteLink: {
      type: String,
      default: "",
    },
    totalEarning: {
      type: String,
      default: "",
    },
    hrRate: {
      type: String,
      default: "",
    },
    employees: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    LinkedIn: {
      type: String,
      default: "",
    },
    Facebook: {
      type: String,
      default: "",
    },
    Twitter: {
      type: String,
      default: "",
    },
    Instagram: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    phone_number: {
      type: String,
      default: "",
    },
    business: {
      type: String,
      default: "",
    },
    Tel: {
      type: [],
      default: [],
    },
    mail: {
      type: [],
      default: [],
    },
    webLinkedin: {
      type: [],
      default: [],
    },
    webInstagram: {
      type: [],
      default: [],
    },
    webTwitter: {
      type: [],
      default: [],
    },
    webFacebook: {
      type: [],
      default: [],
    },
    isMailSend: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

companySchema.index({ companyName: "text", location: "text", address: "text" });

export const CompanyModel = mongoose.model("companes", companySchema);
