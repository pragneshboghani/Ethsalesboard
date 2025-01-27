import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
// import { PhoneInput } from "./PhoneInput";
// import { getCountries, getCountryCallingCode, parsePhoneNumber } from "react-phone-number-input";
import PhoneInputL, {
  Country,
  parsePhoneNumber,
} from "react-phone-number-input";
import CountryCode from "react-phone-number-input";
import { PhoneInput } from "./../custom/PhoneInput/index";
import parsePhoneNumberFromString, { parseDigits } from "libphonenumber-js";

interface FormInputProps {
  name: string;
  phonCodeName: string;
  label: string;
  type?: string;
  placeholder?: string;
  isRequire?: Boolean;
}

const FormPhoneInput: React.FC<FormInputProps> = ({
  name,
  phonCodeName,
  label,
  type = "text",
  placeholder,
  isRequire,
}) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useFormContext();
  return (
    <div className="space-y-1">
      <Label className="font-semibold text-base">
        {label}
        {isRequire && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <PhoneInput
        type={type}
        placeholder={placeholder}
        value={getValues(name)}
        onChange={(e) => {
          let _v = e?.target?.value;
          if (_v && _v.length > 0) {
            const phone_code =
              parsePhoneNumberFromString(_v)?.getPossibleCountries()[0];
            setValue(phonCodeName, phone_code);
          }
          setValue(name, e.target.value);
        }}
      />

      {errors[name] && (
        <p className="text-red-500 text-sm">{String(errors[name]?.message)}</p>
      )}
      {errors[phonCodeName] && (
        <p className="text-red-500 text-sm">
          {String(errors[phonCodeName]?.message)}
        </p>
      )}
    </div>
  );
};

export default FormPhoneInput;
