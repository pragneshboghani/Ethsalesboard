export interface Option {
  name: string;
  label: string;
  checked?: boolean;
}

export interface CheckBoxInputProps {
  label: string;
  options: Option[];
  value: string[];
  onChange: (updatedOptions: Option[]) => void;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
  className?: string;
}

const CheckBoxInput = ({
  label,
  options,
  value,
  onChange,
  required = false,
  error,
  disabled = false,
  className = "",
}: CheckBoxInputProps) => {
  return <div>CheckBoxInput</div>;
};

export default CheckBoxInput;
