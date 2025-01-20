import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import Apartments from "../../../assets/IconComponents/Apartments";
import Complaints from "../../../assets/IconComponents/Complaints";
import Dashboard from "../../../assets/IconComponents/Dashboard";
import Events from "../../../assets/IconComponents/Events";
import Maintenance from "../../../assets/IconComponents/Maintenance";
import Members from "../../../assets/IconComponents/Members";
import Notices from "../../../assets/IconComponents/Notices";
import Visitors from "../../../assets/IconComponents/Visitors";
import Sidebar from "./Sidebar";

export default {
  title: "Molecules/Sidebar",
  component: Sidebar,
  argTypes: {
    isOpen: {
      control: {
        type: "boolean",
      },
      description: "Controls the visibility of the sidebar",
    },
    menuItems: {
      control: {
        type: "object",
      },
      description: "Array of objects to populate sidebar menu items",
    },
    avatarUrl: {
      control: {
        type: "text",
      },
      description: "URL of the user's avatar image",
    },
    userName: {
      control: {
        type: "text",
      },
      description: "Name of the user to be displayed in the sidebar",
    },
  },
};

const Template = (args) => (
  <BrowserRouter>
    <Sidebar {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  menuItems: [
    {
      label: "Dashboard",
      icon: <Dashboard />,
      url: "#Dashboard",
    },
    {
      label: "Apartments",
      icon: <Apartments />,
      url: "#Apartments",
      active: true,
    },
    {
      label: "Members",
      icon: <Members />,
      url: "#Members",
    },
    {
      label: "Visitors",
      icon: <Visitors />,
      url: "#Visitors",
    },
    { label: "Events", icon: <Events />, url: "#Events" },
    {
      label: "Maintenance",
      icon: <Maintenance />,
      url: "#Maintenance",
    },
    {
      label: "Notices",
      icon: <Notices />,
      url: "#Notices",
    },
    {
      label: "Complaints",
      icon: <Complaints />,
      url: "#Complaints",
    },
  ],
  avatarUrl:
    "https://www.shutterstock.com/image-photo/close-portrait-smiling-30s-caucasian-260nw-2246095709.jpg",
  userName: "Sahilbhai M. Shah",
};
