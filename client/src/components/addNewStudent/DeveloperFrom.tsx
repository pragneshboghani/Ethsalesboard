import * as React from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label, SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { Developer } from "@/dto/company";
import FormInput from "../custom/FormInput";
import {
  useForm,
  FormProvider,
  useFormContext,
  useFieldArray,
} from "react-hook-form";
import DynamicFieldArray from "../custom/DynamicFieldArray";

const developerValidationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  mobileCode: yup.string().required("Mobile code is required"),
  mobileNumber: yup.string().required("Mobile number is required"),
  currentPosition: yup.string().required("Current position is required"),
  expeditedSalary: yup.string().required("Expedited salary is required"),

  education: yup
    .array()
    .of(
      yup.object({
        instituteName: yup.string().required("Institute name is required"),
        degree: yup.string().required("Degree is required"),
        fieldOfStudy: yup.string().required("Field of study is required"),
        startYear: yup.string().required("Start year is required"),
        endYear: yup.string().required("End year is required"),
      })
    )
    .optional(),

  experience: yup
    .array()
    .of(
      yup.object({
        companyName: yup.string().required("Company name is required"),
        jobTitle: yup.string().required("Job title is required"),
        startDate: yup.string().required("Start date is required"),
        endDate: yup.string().required("End date is required"),
        description: yup.string().optional(),
        salary: yup.string().optional(),
        resignationDate: yup.string().optional(),
        resignReason: yup.string().optional(),
        noticePeriod: yup.string().optional(),
      })
    )
    .optional(),

  profile: yup
    .array()
    .of(
      yup.object({
        fileName: yup.string().required("File name is required"),
        fileURL: yup
          .string()
        //   .url("Invalid URL format")
          .required("File URL is required"),
      })
    )
    .optional(),
});

type Developer = yup.InferType<typeof developerValidationSchema>;

const AddNewStudent: React.FC = () => {
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobileCode: "",
    mobileNumber: "",
    education: [
      {
        instituteName: "",
        degree: "",
        fieldOfStudy: "",
        startYear: "",
        endYear: "",
      },
    ],
    experience: [
      {
        companyName: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    profile: [
      {
        fileName: "",
        fileURL: "",
      },
    ],
    status: "",
    currentPosition: "",
    expeditedSalary: "",
  };

  const methods = useForm<Developer>({
    resolver: yupResolver(developerValidationSchema),
    defaultValues: defaultValues,
  });
  const onSubmit = (data: Developer) => {
    console.log("data:::", data);
    console.log(JSON.stringify(data, null, 2));
  };
  console.log("methods:", methods.formState.errors);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary_background border-none outline-none">
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-lg w-[90%] h-[90%] sm:h-auto overflow-hidden sm:rounded-lg"
        style={{
          maxHeight: "90vh", // Prevents the dialog from exceeding viewport height
        }}>
        <DialogHeader>
          <DialogTitle className="mb-3 text-lg sm:text-xl">
            Add New Developer
          </DialogTitle>
          <SelectGroup className="flex flex-col gap-4">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="max-h-[50vh] sm:max-h-[60vh] overflow-auto space-y-4">
                  <FormInput name="firstName" label="First Name" />
                  <FormInput name="lastName" label="Last Name" />
                  <FormInput name="email" label="Email" type="email" />
                  <FormInput name="mobileCode" label="Mobile Code" />
                  <FormInput name="mobileNumber" label="Mobile Number" />
                  <FormInput name="currentPosition" label="Current Position" />
                  <FormInput name="expeditedSalary" label="Expedited Salary" />

                  <DynamicFieldArray name="education" label="Education" />
                  <DynamicFieldArray name="experience" label="Experience" />
                  <DynamicFieldArray name="profile" label="Profile" />
                </div>

                <Button
                  className="bg-primary_background border-none outline-none py-5 mt-4 w-full"
                  type="submit">
                  Add New
                </Button>
              </form>
            </FormProvider>
          </SelectGroup>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewStudent;
