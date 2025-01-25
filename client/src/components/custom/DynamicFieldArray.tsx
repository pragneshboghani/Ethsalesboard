import * as React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormInput from "./FormInput";
import { convertToFileNameFormat } from "@/lib/utils";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

interface FieldArrayProps {
  name: string;
  label: string;
  icon: React.ReactNode
}

const DynamicFieldArray: React.FC<FieldArrayProps> = ({ name, label, icon }) => {
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
   <> 
    <hr className="bg-primary_background h-[2px]"/>
    <div className="space-y-2 overflow-aut">
      <div className="flex items-center justify-between mb-2">
        <Label className="font-semibold text-base flex items-center gap-2">{icon}{label}:</Label>
        <Button
          onClick={() => append({})}
          className="border border-primary_background hover:bg-transparent bg-transparent text-primary_background text-sm px-2 py-1 h-auto w-fit hover:border-primary_background">
          <Plus width={20} /> Add {label}
        </Button>
      </div>
    <div className="grid grid-cols-3 gap-5 ">
    {fields.map((field, index) => (
        <div key={field.id} className=" shadow-[0px_0px_12px_rgba(0,0,0,0.2)] p-3 rounded-lg space-y-2 border border-[#23a56644]">
          {arrOfObjectFields?.map((key) => (
            <FormInput
              name={`${name}[${index}].${key}`}
              label={convertToFileNameFormat(key)}
              
            />
          ))}
          <Button onClick={() => remove(index)} className="border hover:bg-transparent bg-transparent  text-red-500 border-red-500 hover:border-red-600 w-full">
            <Trash2 color="red" /> Remove
          </Button>
        </div>
      ))}
    </div>

    </div>
   </>
  );
};

export default DynamicFieldArray;
