export type CollapseItemName = string | number;
import type { Ref } from 'vue';
export interface CollapseProps {
  modelValue: CollapseItemName[]; // 当前激活的面板名称
  accordion?: boolean; // 是否手风琴模式
}

export interface CollapseItemProps {
  name: CollapseItemName;
  title?: string;
  disabled?: boolean;
}
export interface CollapseEmits {
  (e: 'update:modelValue', value: CollapseItemName[]): void;
  (e: 'change', value: CollapseItemName[]): void;
}
export interface CollapseContext {
  activeNames: Ref<CollapseItemName[]>;
  handleItemClick(name: CollapseItemName): void;
}
