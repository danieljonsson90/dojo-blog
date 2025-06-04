import { fn } from 'storybook/test';

import BaseLink from '../components/BaseLink.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'BaseLink',
  component: BaseLink,
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
    label: 'Link',
  },
};
export const LargePrimary = {
  args: {
    size: 'large',
    label: 'Link',
  },
};
export const SmallPrimary = {
  args: {
    size: 'small',
    label: 'Link',
  },
};

export const Secondary = {
  args: {
    primary: false,
    label: 'Link',
  },
};

export const Large = {
  args: {
    primary: false,
    size: 'large',
    label: 'Link',
  },
};

export const Small = {
  args: {
    primary: false,
    size: 'small',
    label: 'Link',
  },
};
