import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";

interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

const FormTextArea: React.FC<FormInputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      <Label className="font-semibold text-base">{label}</Label>
      <Textarea
        id={name}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full border-gray-400 ${
          errors[name] ? "border-red-500" : ""
        }`}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
};

export default FormTextArea;
