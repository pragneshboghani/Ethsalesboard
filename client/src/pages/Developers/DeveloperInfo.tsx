import { Button } from "@/components/ui/button";
import { Developer } from "@/dto/company";
import { monthNameDateFormate } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import {
  ArrowDownToLine,
  Building,
  Building2,
  Eye,
  FileText,
  Link2,
  Mail,
  MapPin,
  PhoneCall,
} from "lucide-react";
import * as React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FileUploadPopup from "./DeveloperDocUploader";
import { DOC_CATEGORIES, IDocCategories } from "@/data/appData";
import DeveloperDocView from "./DeveloperDocView";

const DeveloperInfo: React.FC = () => {
  const developerRedux = useAppSelector((state) => state.developer);
  const { id: developerId } = useParams();
  const {
    firstName,
    lastName,
    email,
    mobileCode,
    mobileNumber,
    education,
    experience,
    profile,
    status,
    createdAt,
    updatedAt,
    currentPosition,
    expeditedSalary,
    documents,
  } = React.useMemo(() => {
    return (
      developerRedux?.developers?.find((_d) => _d._id === developerId) || {
        firstName: "",
        lastName: "",
        email: "",
        mobileCode: "",
        mobileNumber: "",
        education: [],
        experience: [],
        profile: [],
        status: "",
        createdAt: "",
        updatedAt: "",
        currentPosition: "",
        expeditedSalary: "",
        documents: [],
      }
    );
  }, [developerId, developerRedux]);

  return (
    <>
      <div className="flex items-center justify-between space-y-2 mb-3">
        <h1 className="text-2xl font-bold tracking-tight">Developer Details</h1>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <div className="shadow-base rounded-lg border bg-card text-card-foreground">
            <div className="p-6 relative pt-6 lg:pt-12">
              <div className="space-y-12">
                <div className="flex flex-col items-center space-y-4">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-20 w-20">
                    <img
                      className="aspect-square h-full w-full"
                      alt="profile"
                      src="https://dashboard.shadcnuikit.com/images/avatars/10.png"
                    />
                  </span>
                  <div className="text-center">
                    <h5 className="text-lg font-semibold">{`${firstName} ${lastName}`}</h5>
                    <div className="text-sm text-muted-foreground">
                      {currentPosition}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-y-4">
                  <div className="flex items-center gap-3">
                    <Mail size={18} />
                    {email}
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneCall size={18} />
                    {mobileNumber}
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} />
                    {mobileCode}
                  </div>
                  <div className="flex items-center gap-3">
                    <Link2 />
                    {/* <a
                      href="https://www.shadcnuikit.com"
                      className="hover:underline"
                      target="_blank">
                      https://shadcnuikit.com
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="shadow-base rounded-lg border bg-card text-card-foreground">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-lg font-bold leading-none tracking-tight">
                Education
              </h3>
            </div>
            <div className="p-6 pt-0">
              <ol className="relative border-s border-gray-200 dark:border-gray-700">
                {education?.map((_education) => {
                  return (
                    <>
                      <li className="mb-10 ms-6">
                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 ring-8 ring-white dark:bg-green-900 dark:ring-gray-900">
                          <Building size={18} />
                        </span>
                        <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                          {_education?.instituteName}
                        </h3>
                        <time className="mb-2 block text-sm font-normal leading-none text-gray-900 dark:text-gray-900">
                          {monthNameDateFormate(_education?.startYear)} To{" "}
                          {monthNameDateFormate(_education.endYear)}
                        </time>
                        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                          {`${_education?.degree} ${_education?.fieldOfStudy}`}
                        </p>
                      </li>
                    </>
                  );
                })}
              </ol>
            </div>
          </div>
          <div className="shadow-base rounded-lg border bg-card text-card-foreground">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-lg font-bold leading-none tracking-tight">
                Skills
              </h3>
            </div>
            <div className="p-6 pt-0">
              <div className="flex flex-wrap gap-3 *:block *:rounded-lg *:border *:bg-slate-200 *:px-2 *:text-sm dark:*:bg-slate-900">
                <span>Photoshop</span>
                <span>Figma</span>
                <span>HTML</span>
                <span>React</span>
                <span>Tailwind CSS</span>
                <span>CSS</span>
                <span>Laravel</span>
                <span>Node.js</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4 lg:col-span-2">
          <div className="shadow-base rounded-lg border bg-card text-card-foreground">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="flex justify-between">
                <h3 className="text-lg font-bold leading-none tracking-tight">
                  Experience
                </h3>
              </div>
            </div>
            <div className="p-6 pt-0">
              <ol className="relative border-s border-gray-200 dark:border-gray-700">
                {experience?.map((_experience) => {
                  return (
                    <>
                      <li className="mb-10 ms-6">
                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 ring-8 ring-white dark:bg-green-900 dark:ring-gray-900">
                          <Building2 size={18} />
                        </span>
                        <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                          {_experience?.companyName}
                        </h3>
                        <time className="mb-2 block text-sm font-normal leading-none text-gray-900 dark:text-gray-900">
                          {monthNameDateFormate(_experience?.startDate)} To{" "}
                          {monthNameDateFormate(_experience.endDate)}
                        </time>
                        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                          {`${_experience?.description} `}
                        </p>
                      </li>
                    </>
                  );
                })}
              </ol>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between space-y-2 mb-3 p-2">
              <h1 className="text-2xl font-bold tracking-tight">
                Developer Document
              </h1>
              {developerId && (
                <FileUploadPopup developerId={developerId} name={firstName} />
              )}
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {Object.keys(documents)?.map((_docKey) => (
                <>
                  <div className="shadow-base rounded-lg border bg-card text-card-foreground p-4">
                    <h3 className="text-lg font-bold leading-none tracking-tight mb-4">
                      {
                        (DOC_CATEGORIES?.find(
                          (_D: IDocCategories) => _D.categoriesKey === _docKey
                        )).categoriesName
                      }
                    </h3>
                    <div className="grid grid-cols-2 gap-4" data-id="28">
                      {documents[_docKey]?.map((_doc) => (
                        <DeveloperDocView docDetails={_doc} />
                      ))}
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeveloperInfo;
