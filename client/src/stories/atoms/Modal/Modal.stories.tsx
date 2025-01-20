  // Modal.stories.js
  import * as React from "react";
  import { Modal } from "./Modal";

  export default {
    title: "Atoms/Modal",
    component: Modal,
    argTypes: {
      // size: {
      //   control: {
      //     type: "select",
      //     options: ["small", "medium", "large"],
      //   },
      // },
    },
  };

  const Template = (args) => {
    return (
      <>
        <Modal {...args}>
          <p>This is a {args.size} modal!</p>
        </Modal>
      </>
    );
  };

  export const Small = Template.bind({});
  Small.args = {
    size: "small",
    title: "Assign Member",
    isOpen: true,
    description: "This is a small modal.",
  };

  export const Medium = Template.bind({});
  Medium.args = {
    size: "medium",
    title: "Assign Member",
    isOpen: true,
    description: "This is a medium modal.",
  };

  export const Large = Template.bind({});
  Large.args = {
    size: "large",
    title: "Assign Member",
    isOpen: true,
    // description: "This is a large modal.",
  };
