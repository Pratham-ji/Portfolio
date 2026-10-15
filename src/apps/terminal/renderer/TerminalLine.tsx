import React from 'react';
import { TerminalLineData } from '../types';

export const TerminalLine: React.FC<{ data: TerminalLineData, style?: React.CSSProperties }> = ({ data, style }) => {
  return (
    <div 
      style={{ 
        ...style,
        fontFamily: 'monospace',
        fontSize: '13px',
        lineHeight: '20px',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all'
      }}
    >
      {data.segments.map((seg, i) => (
        <span 
          key={i} 
          style={{ 
            color: seg.color || 'var(--pos-text-primary)', 
            fontWeight: seg.bold ? 'bold' : 'normal' 
          }}
        >
          {seg.text}
        </span>
      ))}
    </div>
  );
};
