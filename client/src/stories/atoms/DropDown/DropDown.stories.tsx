import * as React from "react";
import { DropDownSelect } from "./DropDown";

export default {
  title: "Atoms/DropDownSelect",
  component: DropDownSelect,
};

const Template = (args) => <DropDownSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Receptionist",
  label: "Role type",
  onResetClick: (e) => {
    console.log(e);
  },
  onShowClick: (e) => {
    console.log(e);
  },
  options: [
    {
      key: "all",
      value: "All",
    },
    {
      key: "admin",
      value: "Admin",
    },
    {
      key: "buildingMember",
      value: "Building Member",
    },
    {
      key: "employee",
      value: "Employee",
    },
    {
      key: "receptionist",
      value: "Receptionist",
    },
  ],
};

export const Role = Template.bind({});
Role.args = {
  placeholder: "Role",
  label: "Role type",
  onResetClick: (e) => {
    console.log(e);
  },
  onShowClick: (e) => {
    console.log(e);
  },
  options: [
    {
      key: "all",
      value: "All",
    },
    {
      key: "admin",
      value: "Admin",
    },
    {
      key: "buildingMember",
      value: "Building Member",
    },
    {
      key: "employee",
      value: "Employee",
    },
    {
      key: "receptionist",
      value: "Receptionist",
    },
  ],
};

export const BuildingNo = Template.bind({});
BuildingNo.args = {
  placeholder: "Building",
  label: "Building No.",
  onResetClick: (e) => {
    console.log("steste", e);
  },
  onShowClick: (e) => {
    console.log(e);
  },
  options: [
    {
      key: "BuildingA",
      value: "Building A",
    },
    {
      key: "BuildingB",
      value: "Building B",
    },
    {
      key: "BuildingC",
      value: "Building C",
    },
    {
      key: "BuildingD",
      value: "Building D",
    },
  ],
};
