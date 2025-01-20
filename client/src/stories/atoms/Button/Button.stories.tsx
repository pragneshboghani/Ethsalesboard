import * as React from "react";
import ArrowLeft from "@/assets/IconComponents/ArrowLeft";
import Button from "./Button";
import ArrowRight from "@/assets/IconComponents/ArrowRight";

export default {
  title: "Atoms/FormControl/Button",
  component: Button,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "active", "disabled"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
};

const Template = (args) => (
  <div className="h-[80vh] w-full flex justify-center">
    <div className="flex items-center justify-center w-1/3">
      <Button {...args}>{args.children}</Button>
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  variant: "default",
  size: "medium",
  customClass: "w-full",
  children: "Send OTP",
};

export const Active = Template.bind({});
Active.args = {
  variant: "active",
  size: "medium",
  customClass: "w-[50%]",
  children: "Send OTP",
};
export const WithIconDefault = Template.bind({});
WithIconDefault.args = {
  variant: "default",
  size: "small",
  customClass: "!py-[10px]",
  children: (
    <span className="flex items-center gap-[6px] text-body-small font-medium ">
      <ArrowLeft stroke={"#1B1B1B"} className={"w-5 h-5 "} /> <span>Back</span>
    </span>
  ),
};
export const WithIconActive = Template.bind({});
WithIconActive.args = {
  variant: "active",
  size: "small",
  customClass: "!py-[10px]",
  children: (
    <span className="flex items-center gap-[6px] text-body-small font-medium ">
      <span>Next</span>
      <ArrowRight stroke={"#FFFFFF"} className={"w-5 h-5 "} />
    </span>
  ),
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: "disabled",
  size: "medium",
  customClass: "w-[50%]",
  children: "Send OTP",
};

export const Loading = Template.bind({});
Loading.args = {
  variant: "active",
  size: "medium",
  customClass: "w-[50%]",
  children: "Send OTP",
  loading: true,
};
