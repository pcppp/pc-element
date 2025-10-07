<script setup lang="ts">
import type { CollapseItemProps, CollapseEmits } from './types';
import transitionEvents from './transitionEvents';
import { COLLAPSE_CTX_KEY } from './constants';
import { computed, inject } from 'vue';
defineOptions({
  name: 'PcCollapseItem',
});
const props = defineProps<CollapseItemProps>();
const ctx = inject(COLLAPSE_CTX_KEY);
const isActive = computed(() => ctx?.activeNames.value?.includes(props.name));
</script>

<template>
  <div class="er-collapse-item">
    <div
      class="er-collapse-item__header"
      :id="`item-header-${name}`"
      :class="{ 'is-active': isActive }">
      <span class="er-collapse-item__title">
        <slot name="title">{{ title }}</slot>
      </span>
      <er-icon icon="angle-right" class="header-angle" />
    </div>
    <transition name="slide" v-on="transitionEvents">
      <div class="er-collapse-item__wapper" v-show="isActive">
        <div class="er-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
