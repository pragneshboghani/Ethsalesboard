import * as React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormInput from "./FormInput";
import { convertToFileNameFormat } from "@/lib/utils";
import { GraduationCap, Plus, Trash2 } from "lucide-react";
import FormDateInput from "./FormDateInput";
import FormTextArea from "./Textarea";

interface IFieldObject {
  key: string;
  type: string;
  placeholder?: string;
}
interface FieldArrayProps {
  name: string;
  label: string;
  title?: string;
  icon: React.ReactNode;
  objKey: IFieldObject[];
}

const DynamicFieldArray: React.FC<FieldArrayProps> = ({
  name,
  label,
  title,
  icon,
  objKey,
}) => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  // console.log("fields::", fields);

  // const arrOfObjectFields = React.useMemo(() => {
  //   return Object.keys(fields?.[0])?.filter((_d) => _d !== "id");
  // }, [name]);
  return (
    <>
      <hr className="bg-primary_background h-[2px]" />
      <div className="space-y-2 overflow-aut">
        <div className="flex items-center justify-between mb-2">
          <Label className="font-semibold text-base flex items-center gap-2">
            {icon}
            {label}:
          </Label>
          <Button
            type="button"
            onClick={() => append({})}
            className="border border-primary_background hover:bg-transparent bg-transparent text-primary_background text-sm px-2 py-1 h-auto w-fit hover:border-primary_background">
            <Plus width={20} /> Add {label}
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-5 ">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className=" shadow-[0px_0px_12px_rgba(0,0,0,0.2)] p-3 rounded-lg space-y-2 border border-[#23a56644]">
              <div className="flex w-full justify-between items-center">
                <span className="font-bold">{title}</span>
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-1 shadow-none bg-transparent hover:bg-transparent hover:border-none">
                  <Trash2 color="red" />
                </Button>
              </div>
              {objKey?.map(({ key, type, placeholder }: IFieldObject) => {
                if (type === "__date") {
                  return (
                    <FormDateInput
                      name={`${name}[${index}].${key}`}
                      placeholder={placeholder}
                      label={convertToFileNameFormat(key)}
                    />
                  );
                }
                if (type === "__textarea") {
                  return (
                    <FormTextArea
                      placeholder={placeholder}
                      name={`${name}[${index}].${key}`}
                      label={convertToFileNameFormat(key)}
                    />
                  );
                }
                return (
                  <FormInput
                    placeholder={placeholder}
                    name={`${name}[${index}].${key}`}
                    label={convertToFileNameFormat(key)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DynamicFieldArray;
