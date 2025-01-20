// OtpInput.stories.js
import * as React from "react";
import OtpInput from "./OtpInput";

export default {
  title: "Atoms/FormControl/OtpInput",
  component: OtpInput,
  argTypes: {},
};

const Template = (args) => {
  return (
    <>
      <div className="h-[80vh] w-full flex justify-center">
        <div className="flex items-center justify-center w-1/2">
          <OtpInput {...args} />
        </div>
      </div>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
