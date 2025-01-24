import mongoose from "mongoose";
import { DOC_CATEGORIES } from "../utils/constant";

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
      enum: Object.values(DOC_CATEGORIES).map((cat) =>
        typeof cat === "object" ? cat.name : cat
      ),
      required: true,
    },
    docSubCategory: {
      type: String,
      enum: Object.values(DOC_CATEGORIES)
        .filter((cat) => typeof cat === "object")
        .flatMap((cat) => Object.values(cat.subcategories)),
    },
  },
  {
    timestamps: true,
  }
);

export const DOCModel = mongoose.model("documents", documentSchema);
