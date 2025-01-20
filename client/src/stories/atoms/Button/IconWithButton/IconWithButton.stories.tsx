import * as React from "react";
import EditIcon from "@/assets/IconComponents/EditIcon";
import IconWithButton from "./IconWithButton";

export default {
  title: "Atoms/FormControl/Button/IconWithButton",
  component: IconWithButton,
  argTypes: {},
};

const Template = (args) => (
  <div className="h-[80vh] w-full flex justify-center">
    <div className="flex items-center justify-center w-1/3">
      <IconWithButton {...args}>{args.children}</IconWithButton>
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: <EditIcon />,
  variant: "outline",
};
export const WithoutOutline = Template.bind({});
WithoutOutline.args = {
  children: <EditIcon stroke={"#7452D4"} />,
  variant: "",
  customClass: "bg-purple-100",
};
