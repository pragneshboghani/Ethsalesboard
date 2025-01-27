import { serializeQueryMaker } from "@/lib/utils";
import { doFetch, REQUEST_CONTENT_TYPE, REQUEST_METHODS } from "./DoFetcher";
import { Developer } from "@/dto/company";

export const DeveloperApis = {
  developer_list: () => {
    // console.log("CompanyApis.developer_list");
    return doFetch(`/developer/developerList`);
  },
  create_developer: (body: Developer) => {
    // console.log("CompanyApis.create_developer");
    return doFetch(`/developer`, {
      method: REQUEST_METHODS.POST,
      body,
    });
  },
  update_developer_put: (id: string, body: Developer) => {
    // console.log("CompanyApis.update_developer_put");
    return doFetch(`/developer/${id}`, {
      method: REQUEST_METHODS.PUT,
      body,
    });
  },
  upload_developer_doc: (body: FormData) => {
    return doFetch("/developer/Doc", {
      method: REQUEST_METHODS.POST,
      contentType: REQUEST_CONTENT_TYPE.MULTIPART,
      body: body,
    });
  },
};
