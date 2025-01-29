import express from "express"
import { companyRoute } from "./company.routes.js";
import {
  developerRoute
} from "./developer.routes.js";
import { mailRoute } from "./mail.routes.js";
const route = express.Router();

route.use("/company", companyRoute);
route.use("/developer", developerRoute);
route.use("/mail", mailRoute);

export default route;