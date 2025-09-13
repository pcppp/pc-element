<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ButtonProps, ButtonEmits, ButtonInstance } from './types';
import { throttle } from 'lodash-es';
import PcIcon from '../Icon/Icon.vue';

defineOptions({
  name: 'PcButton',
});
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
  throttleDuration: 500,
  useThrottle: true,
});
const slots = defineSlots();
const _ref = ref<HTMLButtonElement>();
// 约束你能 emit 哪些事件、各自的参数类型
const emits = defineEmits<ButtonEmits>();
const handleBtnClick = (e: MouseEvent) => emits('click', e);
const handleBtnClickThrottle = throttle(
  handleBtnClick,
  props.throttleDuration,
  { trailing: false }
);
const iconStyle = computed(() => ({
  marginRight: slots.default ? '6px' : '0px',
}));
// 向外暴露出的对象,泛型是为了拿到类型提示
defineExpose<ButtonInstance>({
  ref: _ref,
});
</script>
<template>
  <component
    :is="tag"
    class="er-button"
    ref="_ref"
    :autoFocus="autofocus"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    :class="{
      [`er-button--${type}`]: type,
      [`er-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    style=""
    @click="(e:MouseEvent)=>{useThrottle?handleBtnClickThrottle(e):handleBtnClick(e)}">
    <template v-if="loading">
      <slot name="loading">
        <pc-icon
          class="loading-icon"
          :icon="loadingIcon ?? 'spinner'"
          :style="iconStyle"
          spin
          size="1x"></pc-icon>
      </slot>
    </template>
    <pc-icon
      v-if="icon && !loading"
      :icon="icon"
      size="1x"
      :style="iconStyle"></pc-icon>
    <slot></slot>
  </component>
</template>
<style scoped>
@import './style.css';
</style>
