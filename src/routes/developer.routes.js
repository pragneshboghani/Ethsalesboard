import express from "express";
import {
  addDeveloper,
  deleteDeveloper,
  editDeveloper,
  getDeveloperList,
  getDeveloperProfile,
} from "../controller/developerController.js";
const route = express.Router();



route.post("/", addDeveloper);

route.get("/developerList", getDeveloperList);
route.get("/profile", getDeveloperProfile);
route.put("/editProfile", editDeveloper);
route.delete("/", deleteDeveloper);

export const developerRoute = route;