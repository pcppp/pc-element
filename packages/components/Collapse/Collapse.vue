<script setup lang="ts">
import { provide, ref } from 'vue';
import type { CollapseProps, CollapseEmits, CollapseItemName } from './types';
import { COLLAPSE_CTX_KEY } from './constants';
defineOptions({
  name: 'PcCollapse',
});
const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();
const activeNames = ref<CollapseItemName[]>(props.modelValue);
provide(COLLAPSE_CTX_KEY, { activeNames: activeNames });
</script>

<template>
  <div>
    <slot class="er-collapse"></slot>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
