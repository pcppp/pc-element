<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonProps, ButtonEmits, ButtonInstance } from './types';
import { throttle } from 'lodash-es';

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
const handleBtnClickThrottle = throttle(handleBtnClick, props.throttleDuration);
// 向外暴露出的对象,泛型是为了拿到类型提示
defineExpose<ButtonInstance>({
  ref: _ref,
});
</script>
<template>
  <component
    :is="props.tag"
    class="er-button"
    ref="_ref"
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
    @click="(e:MouseEvent)=>{props.useThrottle?handleBtnClickThrottle(e):handleBtnClick(e)}">
    <slot>this is a button</slot>
  </component>
</template>
<style scoped>
@import './style.css';
</style>
