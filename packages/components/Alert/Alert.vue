<script setup lang="ts">
import type { AlertEmits, AlertInstance, AlertProps } from './types';
import PcIcon from '../Icon/Icon.vue';
const COMP_NAME = 'PcAlert';
import { typeIconMap } from '../../utils';
import { computed, ref, useSlots } from 'vue';
defineOptions({
  name: COMP_NAME,
  type: 'info',
  closable: true,
});
const visible = ref(true);

const slots = useSlots();
const emits = defineEmits<AlertEmits>();
function close() {
  visible.value = false;
  emits('close');
}
function open() {
  visible.value = true;
}
const props = withDefaults(defineProps<AlertProps>(), { closable: true });
const iconName = computed(
  () => typeIconMap.get(props.type || 'circle-info') ?? 'circle-info'
);
const withDescription = computed(() => props.description || slots.default);
defineExpose<AlertInstance>({
  open,
  close,
});
</script>
<template>
  <div
    v-show="visible"
    class="er-alert"
    :class="{
      [`er-alert__${type}`]: type,
      [`er-alert__${effect}`]: effect,
      'text-center': center,
    }">
    <pc-icon :icon="iconName" class="er-alert__icon" v-if="showIcon" />
    <div class="er-alert__content">
      <span
        class="er-alert__title"
        :class="{ 'with-desc': withDescription }"
        :style="{ display: center && !showIcon ? 'flow' : 'inline' }">
        <slot name="title">{{ props.title }}</slot>
      </span>
      <p class="er-alert__description">
        <slot>{{ props.description }}</slot>
      </p>
      <div v-if="closable" class="er-alert__close">
        <pc-icon @click.stop="close" icon="xmark" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
