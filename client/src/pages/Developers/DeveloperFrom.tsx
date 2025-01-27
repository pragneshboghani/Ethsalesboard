import * as React from "react";
import {
  BriefcaseBusiness,
  Copy,
  GraduationCap,
  Loader2,
  Puzzle,
  PuzzleIcon,
  UserRoundPen,
} from "lucide-react";
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
import { SelectGroup } from "@radix-ui/react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { Developer } from "@/dto/company";
import FormInput from "../../components/custom/FormInput";
import { useForm, FormProvider } from "react-hook-form";
import DynamicFieldArray from "../../components/custom/DynamicFieldArray";
import FormPhoneInput from "../../components/custom/FormPhoneInput";
import { Calendar } from "../../components/ui/calendar";
import { DatetimePicker } from "../../components/ui/DateAndTimePicker";
import { DeveloperApis } from "@/services/DeveloperApis";
import { Developer } from "@/dto/company";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addDeveloperReducer } from "@/redux/slices/developerSlice";
import { toast } from "sonner";

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

type IYDeveloper = yup.InferType<typeof developerValidationSchema>;

const AddNewStudent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const [open, setOpen] = React.useState<boolean>(false);
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobileCode: "",
    mobileNumber: "",
    education: [],
    experience: [],
    profile: [],
    currentPosition: "",
    expeditedSalary: "",
  };

  const methods = useForm<IYDeveloper>({
    resolver: yupResolver(developerValidationSchema),
    defaultValues: defaultValues,
  });

  const {
    formState: { isDirty, dirtyFields, isSubmitting },
    reset,
  } = methods;

  const onSubmit = async (data: Developer) => {
    try {
      console.log("data:::", data);
      console.log(JSON.stringify(data, null, 2));

      const response = await DeveloperApis.create_developer(data);
      const developer: Developer = response.data;
      console.log("response::", response);

      dispatch(addDeveloperReducer(developer));
      setOpen(false);
      reset(defaultValues);
    } catch (error) {
      console.log("error::::", error.message);
      toast.error(error.message);
    }
  };
  // console.log("methods:", methods.formState.errors);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary_background border-none outline-none">
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-screen-xl h-[90%] sm:h-auto overflow-hidden sm:rounded-lg"
        style={{
          maxHeight: "90vh",
        }}>
        <DialogHeader>
          <DialogTitle className="mb-3 text-primary_background shadow-md flex items-center border-b-2 border-[#23a5669d] min-h-[52px] px-4 text-lg sm:text-xl ">
            Add New Developer
          </DialogTitle>
          <SelectGroup className="flex flex-col gap-4">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="max-h-[50vh] sm:max-h-[60vh] overflow-auto space-y-4 custom-scrollbar">
                  <div className="grid grid-cols-2 gap-5  p-4 pb-0">
                    <FormInput
                      isRequire={true}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter Developer First Name"
                    />
                    <FormInput
                      isRequire={true}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter Developer Last Name"
                    />
                    <FormInput
                      isRequire={true}
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="Enter Developer Email"
                    />
                    <FormPhoneInput
                      isRequire={true}
                      phonCodeName="mobileCode"
                      name="mobileNumber"
                      label="Mobile Number"
                    />
                    {/* <FormInput name="mobileCode" label="Mobile Code" /> */}
                    {/* <FormInput name="mobileNumber" label="Mobile Number" /> */}
                    <FormInput
                      isRequire={true}
                      name="currentPosition"
                      label="Current Position"
                      placeholder="Enter Developer Current Position"
                    />
                    <FormInput
                      isRequire={true}
                      type="number"
                      name="expeditedSalary"
                      label="Expedited Salary"
                      placeholder="Enter Developer Expected salary"
                    />
                  </div>

                  <div className="p-4 flex flex-col gap-5 mt-0">
                    <DynamicFieldArray
                      name="education"
                      icon={<GraduationCap color="green" />}
                      label="Education"
                      objKey={[
                        {
                          key: "instituteName",
                          type: "__text",
                          placeholder: "Enter the name of your institute",
                        },
                        {
                          key: "degree",
                          type: "__text",
                          placeholder:
                            "Enter your degree (e.g., Bachelors, Masters)",
                        },
                        {
                          key: "fieldOfStudy",
                          type: "__text",
                          placeholder:
                            "Enter your field of study (e.g., Computer Science)",
                        },
                        {
                          key: "startYear",
                          type: "__date",
                          placeholder: "Select the start year",
                        },
                        {
                          key: "endYear",
                          type: "__date",
                          placeholder: "Select the end year",
                        },
                      ]}
                    />
                    <DynamicFieldArray
                      name="experience"
                      label="Experience"
                      icon={<BriefcaseBusiness color="green" />}
                      objKey={[
                        {
                          key: "companyName",
                          type: "__text",
                          placeholder: "Enter the name of the company",
                        },
                        {
                          key: "jobTitle",
                          type: "__text",
                          placeholder:
                            "Enter your job title (e.g., Software Engineer)",
                        },
                        {
                          key: "startDate",
                          type: "__date",
                          placeholder: "Select the start date of your job",
                        },
                        {
                          key: "endDate",
                          type: "__date",
                          placeholder: "Select the end date of your job",
                        },
                        {
                          key: "description",
                          type: "__textarea",
                          placeholder:
                            "Enter a brief description of your role and responsibilities",
                        },
                      ]}
                    />
                    <DynamicFieldArray
                      name="profile"
                      label="Profile"
                      icon={<UserRoundPen color="green" />}
                      objKey={[
                        {
                          key: "fileName",
                          type: "__text",
                          placeholder:
                            "Enter the name of the file (e.g., Resume, Portfolio)",
                        },
                        {
                          key: "fileURL",
                          type: "__text",
                          placeholder:
                            "Enter the URL of the file (e.g., https://example.com/file.pdf)",
                        },
                      ]}
                    />
                  </div>
                </div>

                <div className=" mt-4 w-full max-w-80 mx-auto">
                  <Button
                    className={`border bg-primary_background outline-none py-5 w-full ${
                      isSubmitting && "bg-green-200"
                    }`}
                    type="submit"
                    disabled={isSubmitting}>
                    {isSubmitting && (
                      <Loader2 className="h-8 w-8 animate-spin" />
                    )}
                    Add New
                  </Button>
                </div>
              </form>
            </FormProvider>
          </SelectGroup>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewStudent;
