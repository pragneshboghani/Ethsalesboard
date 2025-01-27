import mongoose from "mongoose";
import { DOC_CATEGORIES } from "../utils/constant.js";

export const documentSchema = mongoose.Schema(
  {
    developerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "developers",
      required: true,
    },
    docPath: {
      type: String,
      required: true,
      unique: true,
    },
    docCategory: {
      type: String,
      enum: DOC_CATEGORIES.map((cat) => cat.categoriesKey),
      required: true,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const DOCModel = mongoose.model("documents", documentSchema);
