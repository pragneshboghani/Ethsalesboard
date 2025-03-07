import express from "express";
import {
  addDeveloper,
  deleteDeveloper,
  developerDocument,
  getDeveloperList,
  getDeveloperProfile,
  updateDeveloperPatch,
  updateDeveloperPut,
} from "../controller/developerController.js";
import { upload } from "../middleware/upload.js";
const route = express.Router();

route.post("/", addDeveloper);

route.get("/developerList", getDeveloperList);
route.get("/developerProfile/:id", getDeveloperProfile);

route.put("/:id", updateDeveloperPut);
route.patch("/:id", updateDeveloperPatch);
route.delete("/", deleteDeveloper);

//Doc
route.post("/Doc", upload.single("file"), developerDocument);

export const developerRoute = route;
