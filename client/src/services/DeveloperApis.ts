import { serializeQueryMaker } from "@/lib/utils";
import { doFetch, REQUEST_METHODS } from "./DoFetcher";

export const DeveloperApis = {
  developer_list: () => {
    console.log("CompanyApis.developer_list"); 
    return doFetch(`/developer/developerList`);
  }
};
