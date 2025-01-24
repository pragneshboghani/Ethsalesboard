import * as React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormInput from "./FormInput";
import { convertToFileNameFormat } from "@/lib/utils";

interface FieldArrayProps {
  name: string;
  label: string;
}

const DynamicFieldArray: React.FC<FieldArrayProps> = ({ name, label }) => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  console.log("fields::", fields);

  const arrOfObjectFields = React.useMemo(() => {
    return Object.keys(fields?.[0])?.filter((_d) => _d !== "id");
  }, [name]);
  return (
    <div className="space-y-2 overflow-auto">
      <Label className="font-semibold">{label}:</Label>
      {fields.map((field, index) => (
        <div key={field.id} className="border p-2 rounded-lg space-y-2">
          {arrOfObjectFields?.map((key) => (
            <FormInput
              name={`${name}[${index}].${key}`}
              label={convertToFileNameFormau(key)}
            />
          ))}
          <Button onClick={() => remove(index)} className="bg-red-500 w-full">
            Remove
          </Button>
        </div>
      ))}
      <Button
        onClick={() => append({})}
        className="bg-primary_background w-full">
        Add {label}
      </Button>
    </div>
  );
};

export default DynamicFieldArray;
