import React from "react";
import { storiesOf } from "@storybook/react";
import PersonInfoComponent from "./PersonInfoComponent";

export default {
  title: "PersonInfoComponent",
  component: PersonInfoComponent,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <PersonInfoComponent {...args} />;

export const Default = Template.bind({});
Default.args = {};
