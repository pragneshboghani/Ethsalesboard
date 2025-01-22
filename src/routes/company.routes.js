import express from "express";
import {
  createCompanyListFile,
  getCategoriesList,
  getCategoryIdList,
  getCompanyList,
} from "../controller/companyController.js";

const route = express.Router();

route.get("/category-id", getCategoryIdList);
route.get("/category-list", getCategoriesList);
route.get("/list", getCompanyList);
route.get("/file", createCompanyListFile);

export const companyRoute = route;
