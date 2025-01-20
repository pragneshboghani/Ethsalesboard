import * as React from "react";
import  { useState } from 'react';
import SearchBar from './SearchBar';

export default {
  title: 'Atoms/FormControl/SearchBar',
  component: SearchBar,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'disabled'],
    },
  },
};

// Single Template for all stories
const Template = (args) => {
  const [value, setValue] = useState('');
  
  return (
    <div className="h-[80vh] w-full flex justify-center">
      <div className="flex items-center justify-center w-full">
        <SearchBar 
          {...args} 
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  placeholder: 'Search...',
  customClass: 'w-[50%]',
};

// Disabled story
export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'disabled',
  placeholder: 'Search...',
  customClass: 'w-[50%]',
};