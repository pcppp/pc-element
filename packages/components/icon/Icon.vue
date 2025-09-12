<script setup lang="ts">
import type { IconProps } from './types';
import { omit } from 'lodash-es';
import { computed } from 'vue';
defineOptions({
  name: 'PcIcon',
  inheritAttrs: false,
});
const props = defineProps<IconProps>();
const filterProps = computed(() => omit(props, ['type', 'color']));
const customStyles = computed(() => ({ color: props.color ?? void 0 }));
</script>
<template>
  <i class="er-icon" :class="[`er-icon-${props.type}`]" :style="">
    <font-awesome-icon v-bind="filterProps"></font-awesome-icon>
  </i>
</template>
