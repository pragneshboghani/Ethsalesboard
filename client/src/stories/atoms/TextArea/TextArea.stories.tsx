import * as React from "react";
import TextArea from "./TextArea";

export default {
  title: "Atoms/FormControl/TextArea",
  component: TextArea,
  argTypes: {},
};

const Template = (args) => (
  <div className="h-[80vh] w-full flex justify-center">
    <div className="flex items-center justify-center w-1/2">
      <TextArea {...args} />
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  id: "address",
  value: "",
  disabled: false,
  error: "",
  label: "Address",
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: "address",
  value: "",
  disabled: true,
  error: "",
  label: "Address",
};
export const Error = Template.bind({});
Error.args = {
  id: "address",
  value: "",
  disabled: false,
  label: "Address",
  error: "Please enter your address",
};
