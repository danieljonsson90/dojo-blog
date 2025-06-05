import input from '../components/BaseInput.vue';

export default {
  title: 'BaseInput',
  component: input,
  tags: ['autodocs'],
};

export const large = {
  args: {
    label: 'label',
    name: 'large',
  },
};

export const medium = {
  args: {
    label: 'medium',
    name: 'medium',
    size: 'medium',
  },
};

export const small = {
  args: {
    label: 'small',
    name: 'small',
    size: 'small',
  },
};

export const textarea = {
  args: {
    label: 'textarea',
    name: 'textarea',
    type: 'textarea',
  },
};
