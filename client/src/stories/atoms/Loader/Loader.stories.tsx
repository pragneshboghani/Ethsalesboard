import * as React from "react";
import Loader from "./Loader";

export default {
  title: "Atoms/Loader",
  component: Loader,
};

const Template = (args) => <Loader {...args} />;

export const Default = Template.bind({});
Default.args = {};
