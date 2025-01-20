import express from "express";
import {
  createCompanyListFile,
  getCategoriesList,
  getCompanyList,
} from "../controller/companyController.js";

const route = express.Router();

route.get("/category-list", getCategoriesList);
route.get("/list", getCompanyList);
route.get("/file", createCompanyListFile);

export const companyRoute = route;
