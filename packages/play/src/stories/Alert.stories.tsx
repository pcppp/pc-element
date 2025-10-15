import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, watch } from 'vue';
import { fn } from 'storybook/test';
import { PcAlert, type AlertInstance } from 'pc-element';
import 'pc-element/dist/theme/Alert.css';

type Story = StoryObj<typeof PcAlert> & { argTypes?: ArgTypes };

const meta: Meta<typeof PcAlert> = {
  title: 'Example/Alert',
  component: PcAlert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'warning', 'info', 'danger'],
    },
    effect: {
      control: 'select',
      options: ['light', 'dark'],
    },
    center: {
      control: 'boolean',
    },
  },
  args: {
    onClose: fn(),
  },
};

export const Default: Story & { args: { visible: boolean } } = {
  args: {
    title: '标题',
    description: '这是一段描述',
    type: 'success',
    effect: 'light',
    closable: true,
    showIcon: true,
    visible: true,
  },
  render: (args) => ({
    components: { PcAlert },
    setup() {
      const alertRef = ref<AlertInstance>();
      watch(
        () => (args as any).visible,
        (val: boolean) => {
          if (val) {
            alertRef.value?.open();
          } else {
            alertRef.value?.close();
          }
        }
      );
      return { args, alertRef };
    },
    template: `
     <pc-alert ref="alertRef" v-bind="args"></pc-alert>
    `,
  }),
};

export default meta;
