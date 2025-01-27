import { baseURL } from "@/config/config";
import { IDocument } from "@/dto/company";
import { ArrowDownToLine, Eye, FileText } from "lucide-react";
import * as React from "react";

interface IDeveloperDocView {
  docDetails: IDocument;
}

const DeveloperDocView: React.FC<IDeveloperDocView> = ({ docDetails }) => {
  const handleDownload = React.useCallback((docPath: string) => {
    const fileUrl = `${baseURL}${docPath}`;
    // Open the document in a new tab
    window.open(fileUrl, "_blank");
  }, []);

  return (
    <>
      <div
        className="flex flex-col items-center justify-center gap-2 rounded-md border p-4 hover:bg-muted/50 cursor-pointer"
        data-id="29"
        onClick={() => {
          handleDownload(docDetails?.docPath);
        }}>
        <div className="flex gap-2 w-full">
          <div className="absolute-start-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 ring-8 ring-white dark:bg-green-900 dark:ring-green-900">
            <FileText size={32} className="" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm truncate w-[50%]" data-id="31">
              {docDetails.docPath?.split("/")?.reverse()?.[0]}
            </span>
            <span className="text-sm truncate w-[70%]" data-id="31">
              {docDetails.note}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeveloperDocView;
