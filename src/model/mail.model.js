import mongoose from "mongoose";

export const mailSchema = mongoose.Schema(
  {
    subTitle: {
      type: String,
      required: true,
    },
    html: {
      type: String,
      required: true,
    },
    skill: {
      type: String,
      required: true,
    },
    Note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const MailModel = mongoose.model("mails", mailSchema);
