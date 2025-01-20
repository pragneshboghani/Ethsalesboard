import * as React from "react";
import ToggleInput from "./ToggleInput";

export default {
  title: "Atoms/FormControl/ToggleInput",
  component: ToggleInput,
};

const Template = (args) => <ToggleInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Show Email Address",
  checked: false
};

export const Active = Template.bind({});
Active.args = {
  label: "Show Email Address",
  checked: true
};