import express from "express";
import { addMail, getMailList, updateMail } from "../controller/mailController.js";

const route = express.Router();

route.get("/", getMailList);
route.post("/", addMail);
route.put("/:id", updateMail);

export const mailRoute = route;
                                              