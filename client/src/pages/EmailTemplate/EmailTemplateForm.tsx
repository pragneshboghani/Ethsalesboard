import * as React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Ensure Shadcn's Dialog components are imported
import QuillEditor from "@/components/custom/ReactQuill";
import FormInput from "@/components/custom/FormInput";
import FormQuillEditor from "@/components/custom/FormQuillEditor";
import FormTextArea from "@/components/custom/Textarea";
import { toast } from "sonner";
import { MailApis } from "@/services/MailApis";
import { IMail } from "@/dto/mail";
import { useAppDispatch } from "@/redux/store";
import { addMailTemplate, updateMailTemplate } from "@/redux/slices/mailSlice";
import { Mail } from "lucide-react";

// Define the TypeScript interface for form data
interface MailFormValues {
  subTitle?: string;
  html?: string;
  skill?: string;
  Note?: string;
}

// Validation schema with Yup
const mailFormSchema = yup.object({
  subTitle: yup
    .string()
    .required("Subtitle is required")
    .max(100, "Maximum 100 characters"),
  html: yup.string().required("HTML content is required"),
  skill: yup
    .string()
    .required("Skill is required")
    .max(50, "Maximum 50 characters"),
  Note: yup.string().optional(),
});

interface IMailFromDialog {
  title: string;
  isEdit?: boolean;
  editData?: IMail;
}

const MailFormDialog: React.FC<IMailFromDialog> = ({
  title,
  isEdit = false,
  editData,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const defaultValues = {
    subTitle: isEdit ? editData?.subTitle : "",
    html: isEdit ? editData?.html : "",
    skill: isEdit ? editData?.skill : "",
    Note: isEdit ? editData?.Note : "",
  };
  const dispatch = useAppDispatch();

  const methods = useForm<MailFormValues>({
    defaultValues,
    resolver: yupResolver(mailFormSchema),
  });
  const { reset } = methods;
  // Reset form when editData changes
  React.useEffect(() => {
    if (isEdit && editData) {
      reset({
        subTitle: editData?.subTitle,
        html: editData?.html,
        skill: editData?.skill,
        Note: editData?.Note,
      });
    }
  }, [isEdit, editData, reset]);

  const onSubmit: SubmitHandler<MailFormValues> = async (data: IMail) => {
    try {
      if (isEdit) {
        const response = await MailApis.update_mail_template(
          editData._id,
          data
        );
        dispatch(updateMailTemplate(response?.data));
        toast.success("Mail Template Crated Successfully");
        console.log("response?.data?.data::123:", response?.data);
      } else {
        const response = await MailApis.create_mail_template(data);
        console.log("response?.data?.data:123:", response?.data);
        dispatch(addMailTemplate(response?.data?.data));
        toast.success("Mail Template Crated Successfully");
        methods?.reset(defaultValues);
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setOpen(false);
    }
    // Perform actions with form data, e.g., API submission
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="borde outline-none py-1">
          <Mail />
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-screen-md h-[100%] sm:h-auto overflow-hidden sm:rounded-lg">
        <DialogHeader>
          <DialogTitle>Mail Form</DialogTitle>
          <DialogDescription>
            Fill out the form below and submit your data.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="max-h-[50vh] sm:max-h-[60vh] overflow-auto space-y-4 custom-scrollbar">
              <div className="space-y-4">
                <FormInput
                  isRequire={true}
                  name="subTitle"
                  label="Sub Title"
                  placeholder="Enter Mail Sub Title"
                />

                {/* HTML Field */}
                <FormQuillEditor name="html" label="Html" isRequire={true} />

                <FormInput
                  isRequire={true}
                  name="skill"
                  label="Skill"
                  placeholder="Enter skill"
                />
                <FormTextArea
                  name="Note"
                  label="Note"
                  placeholder="Enter Note"
                />
              </div>
            </div>
            <DialogFooter className="py-4">
              <Button
                className={"border bg-primary_background outline-none py-1"}
                type="submit">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default MailFormDialog;
