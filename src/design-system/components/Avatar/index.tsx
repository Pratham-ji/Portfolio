import React, { useState } from 'react';
import styles from './Avatar.module.css';

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'busy' | 'away';
}

/**
 * <Avatar />
 * Implements Material 09.
 * Strictly forbids filters, shadows, and gradients.
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  initials,
  size = 'md',
  status
}) => {
  const [hasError, setHasError] = useState(false);

  const renderContent = () => {
    if (src && !hasError) {
      return (
        <img 
          src={src} 
          alt={alt} 
          className={styles.image}
          onError={() => setHasError(true)} 
        />
      );
    }
    
    if (initials) {
      return <span className={styles.initials}>{initials.substring(0, 2)}</span>;
    }

    // Fallback icon/shape
    return (
      <svg width="50%" height="50%" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    );
  };

  return (
    <div className={`${styles.avatarContainer} ${styles[`size-${size}`]}`}>
      {renderContent()}
      
      {status && (
        <span 
          className={`${styles.statusBadge} ${styles[`status-${status}`]}`} 
          title={`Status: ${status}`}
          aria-label={`User is ${status}`}
        />
      )}
    </div>
  );
};
