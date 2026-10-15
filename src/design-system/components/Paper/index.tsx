import React, { forwardRef } from 'react';
import styles from './Paper.module.css';

export type PaperMode = 'resume' | 'markdown' | 'blueprint' | 'ebook';

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: PaperMode;
  children: React.ReactNode;
}

/**
 * <Paper />
 * Consumes Material Paper tokens.
 * Glare-free, readable surface for long-form content.
 */
export const Paper = forwardRef<HTMLDivElement, PaperProps>(({
  mode = 'markdown',
  className = '',
  children,
  ...props
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${styles.paperContainer} ${styles[`mode-${mode}`]} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
});

Paper.displayName = 'Paper';

// @ts-ignore
Paper.metadata = {
  material: "Material Paper",
  motion: "none",
  elevation: 0,
  accessibility: "AA",
  since: "2.5.3"
};
