import type { InjectionKey } from 'vue';
import type { ButtonGroupContext } from './types';

export const COLLAPSE_CTX_KEY: InjectionKey<ButtonGroupContext> =
  Symbol('collapseContext');
