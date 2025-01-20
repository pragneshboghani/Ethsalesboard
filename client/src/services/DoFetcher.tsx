/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseURL } from "@/config/config";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
// import { getCookie } from "cookies-next";

interface IRequestMethods {
  GET: string;
  POST: string;
  PUT: string;
  DELETE: string;
}

const instance: AxiosInstance = axios.create();

instance.interceptors.response.use(
  (res) => res?.data,
  (error) => {
    if (error?.response?.data) {
      throw error?.response?.data;
    }
    if (error?.response?.status === 500) {
      const errorMes = error?.response?.data ?? "Server not responding!";
      throw errorMes;
    }
  }
);

export const REQUEST_METHODS: IRequestMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const REQUEST_CONTENT_TYPE = {
  JSON: "application/json",
  MULTIPART: "multipart/form-data",
};

const defaultReqDetails = {
  method: REQUEST_METHODS.GET,
  contentType: REQUEST_CONTENT_TYPE.JSON,
  body: {},
};

export const doFetch = (url: string, reqDetails: any = defaultReqDetails) => {
  const {
    method = defaultReqDetails.method,
    body = defaultReqDetails.body,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    token = "",
    ...otherOptions
  } = reqDetails;

  const { contentType = defaultReqDetails.contentType } = otherOptions ?? {};
  const apiUrl: string = `${baseURL}/api${url}`;
  // console.log("apiUrl::::", apiUrl)
  // console.log("apiUrl::::", apiUrl)
  const options: AxiosRequestConfig = {
    url: apiUrl,
    method,
    headers: {
      "Content-Type": contentType,
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      // "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  };

  // const Csr_Get_Token = getCookie("token");

  // if (Csr_Get_Token) {
  //   options.headers!.Authorization = `Bearer ${Csr_Get_Token}`;
  // }else{
  //   options.headers!.Authorization = `Bearer ${token}`;
  // }

  if (contentType && contentType.includes("json")) {
    options.data = JSON.stringify(body);
  } else {
    options.data = body;
  }

  return instance(options);
};
