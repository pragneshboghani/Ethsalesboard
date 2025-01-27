import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FileUploader } from "@/components/custom/DropZon";
import { objectToFormData } from "@/lib/utils";
import { DeveloperApis } from "@/services/DeveloperApis";
import { DOC_CATEGORIES } from "../../data/appData";
import { Upload } from "lucide-react";
import { updateDeveloperReducer } from "@/redux/slices/developerSlice";
import { useAppDispatch } from "@/redux/store";

// Yup Schema for validation
const validationSchema = yup.object().shape({
  developerId: yup.string().required("DeveloperId is required"),
  docCategory: yup.string().required("Category is required"),
  file: yup
    .mixed()
    .required("A file is required")
    .test("fileType", "Only .pdf or .doc files are allowed", (value) => {
      return (
        value &&
        ["application/pdf", "application/msword"].includes((value as File).type)
      );
    }),
  note: yup.string().optional(),
});

interface FileUploadPopupProps {
  developerId: string;
  name: string;
}

//*************** */ component

const FileUploadPopup: React.FC<FileUploadPopupProps> = ({ developerId }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      developerId: developerId,
      docCategory: "",
      note: "",
      file: null,
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    const formData = objectToFormData(data);
    const response = await DeveloperApis.upload_developer_doc(formData);
    console.log(response?.data);
    dispatch(updateDeveloperReducer(response?.data));
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-700">
          <Upload /> Upload File
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-bold">
            Upload Document <Label>{`(${name})`}</Label>
          </h2>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Category Selection */}
          <div>
            <Label htmlFor="docCategory">Category</Label>
            <Select
              onValueChange={(value) => setValue("docCategory", value)}
              defaultValue="">
              <SelectTrigger id="docCategory">
                <SelectValue placeholder="Select a doc Category" />
              </SelectTrigger>
              <SelectContent>
                {DOC_CATEGORIES.map(({ categoriesName, categoriesKey }) => (
                  <SelectItem key={categoriesKey} value={categoriesKey}>
                    {categoriesName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.docCategory && (
              <p className="text-red-500 text-sm">
                {errors.docCategory.message}
              </p>
            )}
          </div>

          {/* Subcategory (Optional) */}
          <div>
            <Label htmlFor="subcategory">Note</Label>
            <Input
              className="w-full border-gray-400"
              id="note"
              placeholder="Enter Note (optional)"
              {...register("note")}
            />
          </div>

          {/* File Input */}
          <div>
            <Label htmlFor="file">Upload File</Label>
            <FileUploader
              accept={{
                "image/*": [],
                "application/pdf": [".pdf"],
                "application/msword": [".doc", ".docx"],
              }}
              onValueChange={(acceptedFiles: File[]) =>
                setValue("file", acceptedFiles[0])
              }
              {...register("file")}
            />
            {errors.file && (
              <p className="text-red-500 text-sm">{errors.file.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadPopup;
