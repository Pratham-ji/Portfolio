import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  children: React.ReactNode;
}

/**
 * <Badge />
 * Semantic status indicator.
 * Strictly avoids Brand Red, utilizing system semantic colors.
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  className = '',
  children,
  ...props
}) => {
  return (
    <span 
      className={`${styles.badge} ${styles[`variant-${variant}`]} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
};
