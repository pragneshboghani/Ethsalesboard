import express from "express"
import { companyRoute } from "./company.routes.js";
import {
  developerRoute
} from "./developer.routes.js";
const route = express.Router();

route.use("/company", companyRoute);
route.use("/developer", developerRoute);

export default route;