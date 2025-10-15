<script setup lang="ts">
import { handleError, provide, ref, watchEffect, watch } from 'vue';
import type { CollapseProps, CollapseEmits, CollapseItemName } from './types';
import { COLLAPSE_CTX_KEY } from './constants';
import { debugWarn } from '@pc-element/utils';
const COMP_NAME = 'PcCollapse';
defineOptions({
  name: COMP_NAME,
});
const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();
const activeNames = ref<CollapseItemName[]>(props.modelValue);
provide(COLLAPSE_CTX_KEY, {
  activeNames: activeNames,
  handleItemClick: (name: CollapseItemName) => {
    let _activeNames = [...activeNames.value];
    const index = _activeNames.indexOf(name);
    if (index > -1) {
      _activeNames.splice(index, 1);
    } else {
      if (props.accordion) {
        _activeNames = [name];
      } else {
        _activeNames.push(name);
      }
    }
    updateActiveNames(_activeNames);
  },
});
const updateActiveNames = (names: CollapseItemName[]) => {
  activeNames.value = names;
  emits('update:modelValue', names);
  emits('change', names);
};
watchEffect(() => {
  if (props.accordion && activeNames.value.length > 1) {
    debugWarn(
      COMP_NAME,
      '[ErUIError: [ErCollapse] accordion mode should only have one active item]'
    );
  }
});
watch(
  () => props.modelValue,
  (newNames) => {
    updateActiveNames(newNames);
  }
);
</script>

<template>
  <div class="er-collapse">
    <slot></slot>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
