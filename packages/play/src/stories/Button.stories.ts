import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3-vite';

import { fn } from 'storybook/test';
import { PcButton } from 'pc-element';
type Story = StoryObj<typeof PcButton> & { argTypes: ArgTypes };
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<typeof PcButton> = {
  title: 'Example/Button',
  component: PcButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'danger', 'info', ''],
    },
    size: {
      control: { type: 'select' },
      options: ['large', 'default', 'small', ''],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    useThrottle: {
      control: 'boolean',
    },
    throttleDuration: {
      control: 'number',
    },
    autofocus: {
      control: 'boolean',
    },
    tag: {
      control: { type: 'select' },
      options: ['button', 'a', 'div'],
    },
    nativeType: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset', ''],
    },
    icon: {
      control: { type: 'text' },
    },
    loadingIcon: {
      control: { type: 'text' },
    },
  },
  args: { onClick: fn() },
};
const container = (val: string) => `
<div style="margin:5px">
  ${val}
</div>
`;

export const Default: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: 'text' },
    },
  },
  args: {
    type: 'primary',
    content: 'Button',
  },
  render: (args: any) => ({
    components: { PcButton },
    setup() {
      return { args };
    },
    template: container(
      `<pc-button v-bind="args">{{args.content}}</pc-button>`
    ),
  }),
};
export default meta;
