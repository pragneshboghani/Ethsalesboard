import * as React from "react";
import SelectDropDown from "./SelectDropDown";

export default {
  title: "Atoms/FormControl/SelectDropDown",
  component: SelectDropDown,
};

const Template = (args) => (
  <div className="h-[80vh] w-full flex justify-center">
    <div className="flex items-center justify-center w-1/2">
      <SelectDropDown {...args} />
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  label: "Choose an option",
  emptyOption: "Please select option",
  value: "",
  customclass: "",
  size: "regular",
  options: [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 4", value: "option4" },
    { label: "Option 5", value: "option5" },
    { label: "Option 6", value: "option6" },
    { label: "Option 7", value: "option7" },
  ],
};

export const WithSelectedValue = Template.bind({});
WithSelectedValue.args = {
  label: "Choose a fruit",
  emptyOption: "Please select option",
  value: "apple",
  customclass: "",
  size: "regular",
  options: [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
  ],
};
export const Diabled = Template.bind({});
Diabled.args = {
  label: "Choose a fruit",
  emptyOption: "Please select option",
  value: "apple",
  customclass: "",
  disabled: true,
  size: "regular",
  options: [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
  ],
};

export const Small = Template.bind({});
Small.args = {
  label: "Choose an option",
  emptyOption: "Please select option",
  value: "option2",
  size: "small",
  customclass: "h-[36px] overflow-hidden",
  options: [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 4", value: "option4" },
    { label: "Option 5", value: "option5" },
    { label: "Option 6", value: "option6" },
    { label: "Option 7", value: "option7" },
  ],
};
