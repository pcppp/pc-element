import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { PcCollapse, PcCollapseItem } from 'pc-element';
import 'pc-element/dist/theme/Collapse.css';
type Story = StoryObj<typeof PcCollapse>;

const meta: Meta<typeof PcCollapse> = {
  title: 'Example/Collapse',
  component: PcCollapse,
  subcomponents: { PcCollapseItem },
  tags: ['autodocs'],
};

export const Default: Story = {
  render: (args) => ({
    components: {
      PcCollapse,
      PcCollapseItem,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <pc-collapse v-bind="args">
      <pc-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </pc-collapse-item>
      <pc-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </pc-collapse-item>
      <pc-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </pc-collapse-item>
    </pc-collapse>
    `,
  }),
  args: {
    accordion: true,
    modelValue: ['a'],
  },
};

export default meta;
