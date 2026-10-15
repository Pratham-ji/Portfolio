import React from 'react';

export const Cursor: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes terminal-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
      <span 
        style={{
          display: 'inline-block',
          width: '8px',
          height: '15px',
          backgroundColor: '#D71921',
          boxShadow: '0 0 6px rgba(215, 25, 33, 0.45)',
          verticalAlign: 'middle',
          animation: 'terminal-blink 1s steps(1) infinite',
          marginLeft: '1px'
        }}
      />
    </>
  );
};
