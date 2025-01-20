import * as React from "react";
import { PenLine, Trash2 } from "lucide-react";
import EditIcon from "@/assets/IconComponents/EditIcon";
import { ActionButtons } from "../ActionButtons/ActionButtons";
import Table from "./Table";

export default {
  title: "Atoms/Table",
  component: Table,
};

const Template = (args) => <Table {...args} />;

export const Default = Template.bind({});

Default.args = {
  // topHeaderText: "Total 28 Members",
  headers: [
    { label: "Block No.", key: "block", colSpan: 1 },
    { label: "Flat/House No.", key: "flat", colSpan: 1 },
    {
      label: "Member Name",
      key: "name",
      colSpan: 9,
      customstyle: true,
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          <span className="text-body-small font-inter">{value}</span>
          {row.role && (
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
              {row.role}
            </span>
          )}
        </div>
      ),
    },
    {
      label: "Action",
      key: "action",
      colSpan: 1,
      render: (_, row) => (
        <button
          onClick={() => alert(`Editing: ${row.name}`)}
          className="p-[6px] rounded border border-grey-200"
        >
          <EditIcon />
        </button>
      ),
    },
  ],
  data: [
    { block: "A", flat: "101", name: "Bhautikbhai Suhagiya", role: "Admin" },
    { block: "A", flat: "101", name: "Harsh M. Hirpara", role: null },
    {
      block: "A",
      flat: "101",
      name: "Not Assigned",
      role: null,
    },
    { block: "A", flat: "101", name: "Ravibhai Savaliya", role: null },
    { block: "A", flat: "101", name: "Balubhai M. Shah", role: null },
    { block: "A", flat: "101", name: "Rajubhai Kachhadiya", role: null },
  ],
};

export const MembersManagementTableData = Template.bind({});

MembersManagementTableData.args = {
  topHeaderText: "Total 28 Members",
  headers: [
    {
      label: "Member Name",
      key: "name",
      colSpan: 9,
      customstyle: true,
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          <span className="text-body-small font-inter">{value}</span>
          {row.role && (
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
              {row.role}
            </span>
          )}
        </div>
      ),
    },
    { label: "Block No.", key: "block", colSpan: 1 },
    { label: "Flat/House No.", key: "flat", colSpan: 1 },
    { label: "Mobile No.", key: "mobile", colSpan: 1 },
    { label: "Role", key: "role", colSpan: 1 },
    {
      label: "Action",
      key: "action",
      colSpan: 1,
      render: (_, row) => (
        <ActionButtons
          options={[
            {
              customClass:
                "text-[#1B1B1B] text-md hover:bg-gray-100 rounded-lg",
              onClick: (e) => {
                console.log(e);
              },
              icon: <PenLine className="!h-[20px] !w-[20px]" />,
              label: "Edit Member",
            },
            {
              customClass: "text-red-700 text-md hover:bg-gray-100 rounded-lg",
              onClick: (e) => {
                console.log(e);
              },
              icon: <Trash2 className="!h-[20px] !w-[20px]" />,
              label: "Delete Member",
            },
          ]}
        />
      ),
    },
  ],
  data: [
    {
      block: "A",
      flat: "101",
      name: "Bhautikbhai Suhagiya",
      mobile: "67897 78980",
      role: "Admin",
    },
    {
      block: "A",
      flat: "101",
      name: "Harsh M. Hirpara",
      mobile: "67897 78980",
      role: null,
    },
    {
      block: "A",
      flat: "101",
      name: "Not Assigned",
      customClass: "text-grey-400",
      mobile: "67897 78980",
      role: null,
    },
    {
      block: "A",
      flat: "101",
      name: "Ravibhai Savaliya",
      mobile: "67897 78980",
      role: null,
    },
    {
      block: "A",
      flat: "101",
      name: "Balubhai M. Shah",
      mobile: "67897 78980",
      role: null,
    },
    {
      block: "A",
      flat: "101",
      name: "Rajubhai Kachhadiya",
      mobile: "67897 78980",
      role: null,
    },
  ],
};
