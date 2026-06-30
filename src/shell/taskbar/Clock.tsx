import { useState, useEffect } from 'react';

export const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = time.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="flex flex-col items-end justify-center px-2 py-1 select-none hover:bg-[var(--theme-surface-hover)] rounded-md cursor-pointer transition-colors">
      <div className="text-xs font-medium text-[var(--theme-text)]">{timeString}</div>
      <div className="text-[10px] text-[var(--theme-text-muted)]">{dateString}</div>
    </div>
  );
};
