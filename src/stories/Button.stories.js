import { fn } from 'storybook/test';

import BaseButton from '../components/BaseButton.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    label: 'Button',
  },
};
export const LargePrimary = {
  args: {
    size: 'large',
    label: 'Button',
  },
};
export const SmallPrimary = {
  args: {
    size: 'small',
    label: 'Button',
  },
};
export const Secondary = {
  args: {
    primary: false,
    label: 'Button',
  },
};

export const Large = {
  args: {
    primary: false,
    size: 'large',
    label: 'Button',
  },
};

export const Small = {
  args: {
    primary: false,
    size: 'small',
    label: 'Button',
  },
};
