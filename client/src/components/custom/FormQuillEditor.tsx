import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import QuillEditor from "./ReactQuill";

interface FormQuillEditorProps {
  name: string;
  label: string;
  isRequire?: boolean;
}

const FormQuillEditor: React.FC<FormQuillEditorProps> = ({
  name,
  label,
  isRequire,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      <Label className="font-semibold text-base">
        {label}
        {isRequire && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{ required: isRequire }}
        render={({ field }) => (
          <QuillEditor value={field.value || ""} setValue={field.onChange} />
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
};

export default FormQuillEditor;
