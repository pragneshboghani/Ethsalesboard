import * as React from "react";
import UserProfile from "./UserProfile";

export default {
  title: "Atoms/Sidebar/UserProfile",
  component: UserProfile,
};

const Template = () => (
  <div className="h-[50vh] w-full flex justify-center">
    <div className="flex items-center justify-center w-64">
      <UserProfile />
    </div>
  </div>
);

export const Default = Template.bind({});
