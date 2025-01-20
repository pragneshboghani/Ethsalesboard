import * as React from "react";
import { PenLine, Trash2 } from "lucide-react";
import { ActionButtons } from "./ActionButtons";


export default {
  title: "Atoms/ActionButtons",
  component: ActionButtons,
};

const Template = (args) => <ActionButtons {...args} />;

export const Default = Template.bind({});
Default.args = {
    options : [
      {
        customClass: "text-[#1B1B1B] text-md hover:bg-gray-100 rounded-lg",
        onClick : (e) => {
          console.log(e);
        },
        icon : <PenLine className="!h-[20px] !w-[20px]" />,
        label : "Edit Member"
      },
      {
        customClass: "text-red-700 text-md hover:bg-gray-100 rounded-lg",
        onClick : (e) => {
          console.log(e);
        },
        icon : <Trash2 className="!h-[20px] !w-[20px]" />,
        label : "Delete Member"
      },
    ]
};