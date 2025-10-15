export type AlertType = 'success' | 'info' | 'warning' | 'danger';

export interface AlertProps {
  title?: string; // 标题
  type?: AlertType; // 类型 : success/info/warning/danger/error/non-compliant
  description?: string; // 辅助性文字
  effect?: 'light' | 'dark'; // 主题
  closable?: boolean; // x图标隐藏
  center?: boolean; // 文本居中
  showIcon?: boolean; // 显示图标
}

export interface AlertEmits {
  (e: 'close'): void;
}

export interface AlertInstance {
  open(): void;
  close(): void;
}
