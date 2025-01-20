// ButtonBadge.stories.jsx
import * as React from "react";
import BadgeButton, { BadgeVariants } from "./BadgeButton";
import { Check, X, ArrowLeft, ArrowRight } from "lucide-react";

export default {
  title: "Atoms/FormControl/Button/BadgeButton",
  component: BadgeButton,
  argTypes: {
    text: { control: "text" },
    variant: {
      control: { type: "select" },
      options: BadgeVariants,
    },
  },
};

const Template = (args) => <BadgeButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "Approved",
  variant: "green",
  iconLeft: null,
  iconRight: null,
};

export const BlueBadge = Template.bind({});
BlueBadge.args = {
  text: "Info",
  variant: "blue",
  iconLeft: <ArrowLeft size={16} />,
};

export const GreenBadge = Template.bind({});
GreenBadge.args = {
  text: "Success",
  variant: "green",
  iconRight: <Check size={16} />,
};

export const RedBadge = Template.bind({});
RedBadge.args = {
  text: "Error",
  variant: "red",
  iconLeft: <X size={16} />,
};

export const OrangeBadge = Template.bind({});
OrangeBadge.args = {
  text: "Warning",
  variant: "orange",
  iconLeft: <ArrowLeft size={16} />,
  iconRight: <ArrowRight size={16} />,
};

export const PurpleBadge = Template.bind({});
PurpleBadge.args = {
  text: "Warning",
  variant: "purple",
};

export const YellowBadge = Template.bind({});
YellowBadge.args = {
  text: "Warning",
  variant: "yellow",
};

export const GreyBadge = Template.bind({});
GreyBadge.args = {
  text: "Secondary",
  variant: "grey",
  iconRight: <X size={16} color="#F44336"/>,
};