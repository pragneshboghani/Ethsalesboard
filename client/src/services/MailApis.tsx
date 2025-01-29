import { serializeQueryMaker } from "@/lib/utils";
import { doFetch, REQUEST_CONTENT_TYPE, REQUEST_METHODS } from "./DoFetcher";
import { Developer } from "@/dto/company";
import { IMail } from "@/dto/mail";

export const MailApis = {
  get_mail_templates: () => {
    // console.log("CompanyApis.developer_list");
    return doFetch(`/mail`);
  },
  create_mail_template: (body: IMail) => {
    // console.log("CompanyApis.create_developer");
    return doFetch(`/mail`, {
      method: REQUEST_METHODS.POST,
      body,
    });
  },
  update_mail_template: (id: string, body: IMail) => {
    // console.log("CompanyApis.create_developer");
    return doFetch(`/mail/${id}`, {
      method: REQUEST_METHODS.PUT,
      body,
    });
  },
};
