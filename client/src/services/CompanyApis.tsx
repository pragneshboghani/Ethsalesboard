import { serializeQueryMaker } from "@/lib/utils";
import { doFetch, REQUEST_METHODS } from "./DoFetcher";

export const CompanyApis = {
  company_category_list: () => {
    // console.log("CompanyApis.company_category_list"); 
    return doFetch(`/company/category-list`);
  },
  company_list: (queryObject: unknown) => {
    const query = serializeQueryMaker(queryObject);

    return doFetch(`/company/list${query ? `?${query}` : ""}`);
  },
};
