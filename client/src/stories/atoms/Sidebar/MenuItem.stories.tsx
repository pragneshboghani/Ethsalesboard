import  * as React from "react";
import Dashboard from "@/assets/IconComponents/Dashboard";
import MenuItem from "./MenuItem";

export default {
  title: "Atoms/Sidebar/MenuItem",
  component: MenuItem,
  argTypes: {
    label: {
      control: { type: "text" },
      description: "Label for the menu item",
    },
    icon: {
      description: "Icon for the menu item (passed as JSX)",
    },
    url: {
      control: { type: "text" },
      description: "URL for the menu item",
    },
    active: {
      control: {
        type: "boolean",
      },
      description: "Button is active or not",
    },
  },
};

const Template = (args) => (
  <div className="h-[80vh] w-full flex justify-center">
    <div className="flex items-center justify-center w-48">
      <MenuItem {...args} />
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  label: "Dashboard",
  icon: <Dashboard />,
  url: "/dashboard",
  active: false,
};

export const Active = Template.bind({});
Active.args = {
  label: "Dashboard",
  icon: <Dashboard />,
  url: "/dashboard",
  active: true,
};
