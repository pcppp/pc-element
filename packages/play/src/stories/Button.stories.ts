import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3-vite';
import 'pc-element/dist/theme/Button.css';
import { fn, within, userEvent, expect } from 'storybook/test';
import { PcButton, PcButtonGroup } from 'pc-element';
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
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step('click btn', async () => {
      await userEvent.click;
    });
  },
};
export const Circle: Story = {
  args: {
    icon: 'search',
  },
  render: (args: any) => ({
    components: { PcButton },
    setup() {
      return { args };
    },
    template: container(`
      <pc-button circle v-bind="args"/>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step('click button', async () => {
      await userEvent.click(canvas.getByRole('button'));
    });

    expect(args.onClick).toHaveBeenCalled();
  },
};
export const Group: Story & { args: { content1: string; content2: string } } = {
  argTypes: {
    groupType: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'danger', 'info', ''],
    },
    groupSize: {
      control: { type: 'select' },
      options: ['large', 'default', 'small', ''],
    },
    groupDisabled: {
      control: 'boolean',
    },
    content1: {
      control: { type: 'text' },
      defaultValue: 'Button1',
    },
    content2: {
      control: { type: 'text' },
      defaultValue: 'Button2',
    },
  },
  args: {
    round: true,
    content1: 'Button1',
    content2: 'Button2',
  },
  render: (args) => ({
    components: { PcButton, PcButtonGroup },
    setup() {
      return { args };
    },
    template: container(`
       <pc-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
         <pc-button v-bind="args">{{args.content1}}</pc-button>
         <pc-button v-bind="args">{{args.content2}}</pc-button>
       </pc-button-group>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step('click btn1', async () => {
      await userEvent.click(canvas.getByText('Button1'));
    });
    await step('click btn2', async () => {
      await userEvent.click(canvas.getByText('Button2'));
    });
    expect(args.onClick).toHaveBeenCalled();
  },
};
export default meta;
