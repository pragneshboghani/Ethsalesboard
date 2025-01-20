// Button.stories.tsx
import *  as React from "react";
import CheckBox from "./CheckBox";

export default {
  title: "Atoms/FormControl/CheckBox",
  component: CheckBox,
  argTypes: {},
};

const Template = (args) => (
  <div className="h-[80vh] w-full flex justify-center">
    <div className="flex items-center justify-center w-1/3">
      <CheckBox {...args} />
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
