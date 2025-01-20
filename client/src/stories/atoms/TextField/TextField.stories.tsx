import * as React from "react";
import TextField from "./TextField";

export default {
  title: "Atoms/FormControl/TextField",
  component: TextField,
};

const Template = (args) => (
  <div className="h-[80vh] w-full flex justify-center">
    <div className="flex items-center justify-center w-1/2">
      <TextField {...args}>Click Me</TextField>
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  value: "",
  label: "Name",
  type: "text",
  id: "name",
  disabled: false,
  onChange: () => {},
};

export const Error = Template.bind({});
Error.args = {
  label: "Name",
  type: "number",
  error: "Enter a valid phone number",
  value: "",
  id: "name",
  disabled: false,
  onChange: () => {},
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: "",
  label: "Name",
  type: "text",
  id: "name",
  disabled: true,
  onChange: () => {},
};
