import * as React from "react";
import Editor from "@/components/custom/ReactQuill";
import MailFormDialog from "./EmailTemplateForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/redux/store";
import { IMail } from "@/dto/mail";
import { Separator } from "@radix-ui/react-separator";
import { Edit2 } from "lucide-react";
import { string } from "prop-types";
import { toast } from "sonner";

const EmailTemplate = () => {
  const [selectedMailId, setSelectedMailId] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const mailTemplates = useAppSelector((state) => state.mailTemplates);

  const selectedMail = React.useMemo(() => {
    return mailTemplates?.data?.find(
      (__d: IMail) => __d._id === selectedMailId
    );
  }, [selectedMailId, mailTemplates?.data]);

  const mailCopyHandler = () => {
    const selection = window.getSelection();
    if (selection) {
      var range = document.createRange();
      range.selectNode(document.getElementById("containerid"));
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      toast.success("Text has been copied, now paste in the text-area");
    } else {
      var range = document.createRange();
      range.selectNode(document.getElementById("containerid"));
      window.getSelection().addRange(range);
      document.execCommand("copy");
      toast.success("Text has been copied, now paste in the text-area");
    }
  };
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Mail Template</h1>
        <MailFormDialog title={"Create Template"} />
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* Search Bar */}

        {/* Cards Section */}
        <div className="space-y-4">
          <div className="col-span-2 mb-4">
            <Input
              placeholder="Search by title, skill, or note..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          {mailTemplates?.data.map((item: IMail) => (
            <Card
              key={item._id}
              className="cursor-pointer hover:bg-green-50 border border-green-600"
              onClick={() => setSelectedMailId(item?._id)}>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{item.subTitle}</h3>
                <div className="text-sm text-muted-foreground">
                  {item.skill}
                </div>
                <div className="text-sm text-muted-foreground">{item.Note}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed View Section */}
        <div className="p-4 border rounded-lg bg-muted">
          {selectedMail ? (
            <Card className="w-full bg-background">
              <CardHeader className="flex justify-between flex-row">
                <h2 className="text-2xl font-bold text-primary">
                  Title : {selectedMail.subTitle}
                </h2>
                <MailFormDialog
                  title={"Edit"}
                  editData={selectedMail}
                  isEdit={true}
                />
              </CardHeader>
              <CardContent>
                <div
                  id="containerid"
                  className="prose max-w-none rounded-lg border border-muted/50 bg-muted/10 p-4 text-sm hover:border hover:border-gray-600 cursor-pointer"
                  dangerouslySetInnerHTML={{ __html: selectedMail.html }}
                  onDoubleClick={mailCopyHandler}
                />
              </CardContent>
            </Card>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select a mail to v iew details.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default EmailTemplate;
