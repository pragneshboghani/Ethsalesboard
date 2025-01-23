import express from "express";
import {
  addDeveloper,
  deleteDeveloper,
  getDeveloperList,
  updateDeveloperPatch,
  updateDeveloperPut,
} from "../controller/developerController.js";
const route = express.Router();

route.post("/", addDeveloper);

route.get("/developerList", getDeveloperList);

route.put("/:id", updateDeveloperPut);
route.patch("/:id", updateDeveloperPatch);
route.delete("/", deleteDeveloper);

export const developerRoute = route;
