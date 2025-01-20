import * as React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OtpInputProps {
  value: number | string;
  onChange: (value: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ value, onChange }) => {
  const handleChange = (newValue: string) => {
    const isOnlyNumber = (str) => /^\d+$/.test(str);

    if (isOnlyNumber(newValue) || newValue === "") {
      onChange(newValue);
    }
  };

  return (
    <div className="flex justify-center">
      <InputOTP maxLength={4} onChange={handleChange} value={value as string}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export default OtpInput;
