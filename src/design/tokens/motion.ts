export const motion = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    toastDismiss: '5000ms',
  },
  easing: {
    easeOut: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0.0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  },
} as const;
