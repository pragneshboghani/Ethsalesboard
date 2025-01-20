// src/components/molecules/DatePicker.stories.tsx
import * as React from "react";
import { useState } from "react"
import { Meta, StoryObj } from "@storybook/react"
import { DatePicker } from "./DatePicker"

// Default export for Storybook metadata
const meta: Meta<typeof DatePicker> = {
  title: "Atoms/FormControl/DatePicker",
  component: DatePicker,
  argTypes: {
    selectedDate: { control: "date" },
    onDateChange: { action: "date changed" },
  },
}

export default meta

const Template = (args) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(args.selectedDate)

  return <DatePicker {...args} selectedDate={selectedDate} onDateChange={setSelectedDate} />
}

export const Default = Template.bind({})
Default.args = {
  selectedDate: null, 
  title: "Birthdate",
  disabled : false,
}

export const DateSelected = Template.bind({})
DateSelected.args = {
  selectedDate: 1735101634646, 
  title: "Birthdate",
  disabled : false,
}
