import * as React from "react";

import { ColorPalette } from "./ColorPalette";

export default {
  title: "Theam/Colors",
  component: ColorPalette,
};

const Template = (args) => <ColorPalette {...args} />;

export const Default = Template.bind({});
Default.args = {};
