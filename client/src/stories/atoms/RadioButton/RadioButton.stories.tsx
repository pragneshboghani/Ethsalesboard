// Button.stories.tsx
import * as React from "react";
import RadioButton from "./RadioButton";

export default {
  title: "Atoms/FormControl/RadioButton",
  component: RadioButton,
  argTypes: {},
};

const Template = (args) => (
  <div className="h-[80vh] w-full flex justify-center">
    <div className="flex items-center justify-center w-1/3">
      <RadioButton {...args}>Click Me</RadioButton>
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  label: "Male",
  value: "",
  name: "male",
  customClassName: "",
};

export const Active = Template.bind({});
Active.args = {
  label: "Female",
  value: "Female",
  name: "Female",
  customClassName: "",
};
