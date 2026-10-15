import { LayerManager } from '../../../design-system/managers/LayerManager';
import { TerminalCommandDef, TerminalResult, TerminalSegment } from '../types';

const ASCII_ART = [
  '              ╔═╗             ',
  '             ╔╝ ╚╗            ',
  '            ╔╝▓█▓╚╗           ',
  '           ╔╝▓███▓╚╗          ',
  '          ╔╝▓██▀██▓╚╗         ',
  '         ╔╝▓██   ██▓╚╗        ',
  '        ╔╝▓██ █▄  ██▓╚╗       ',
  '       ╔╝▓██  ███  ██▓╚╗      ',
  '      ╔╝▓██   ███  ██▓╚╗      ',
  '     ╔╝▓██    ███▄███▓▒░╚╗    ',
  '    ╔╝▓██     ███████▓▒░░╚╗   ',
  '   ╔╝▓██      ▀▀▀▀▀██▓▒░░░╚╗  ',
  '  ╔╝▓████████████████▓▒░░░░░╚╗',
  '  ╚══════════════════════════╝',
];

const formatUptime = (): string => {
  const ms = typeof performance !== 'undefined' ? performance.now() : 0;
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};

const getWindowsCount = (): number => {
  if (typeof LayerManager !== 'undefined') {
    const map = (LayerManager as any).windowLayers;
    if (map && typeof map.size === 'number') {
      return map.size;
    }
    const peak = LayerManager.peekHighestLayer();
    if (typeof peak === 'number' && peak > 100) {
      return peak - 100;
    }
  }
  return 0;
};

export const neofetchCommand: TerminalCommandDef = {
  name: 'neofetch',
  description: 'Display system telemetry and OS branding',
  execute: async (): Promise<TerminalResult> => {
    const memoryLayers = LayerManager.peekHighestLayer();
    const windowCount = getWindowsCount();
    const resolution = typeof window !== 'undefined'
      ? `${window.innerWidth}x${window.innerHeight}`
      : '1920x1080';

    const infoLines: Array<
      | { type: 'header'; value: string }
      | { type: 'separator'; value: string }
      | { type: 'kv'; label: string; value: string }
    > = [
      { type: 'header', value: 'pratham@prathamos' },
      { type: 'separator', value: '─────────────────' },
      { type: 'kv', label: 'OS:', value: 'PrathamOS v3.2 (Anodized Void)' },
      { type: 'kv', label: 'Architect:', value: 'Prathamraj Giri' },
      { type: 'kv', label: 'Kernel:', value: 'Hybrid rAF / 60FPS Compositor' },
      { type: 'kv', label: 'Shell:', value: 'PrathamTTY + ChaiScript v1.0' },
      { type: 'kv', label: 'DE:', value: 'PrathamOS Desktop Environment' },
      { type: 'kv', label: 'Stack:', value: 'React, TypeScript, Expo, NativeWind v4' },
      { type: 'kv', label: 'Backend:', value: 'Supabase, C++' },
      { type: 'kv', label: 'Uptime:', value: formatUptime() },
      { type: 'kv', label: 'Memory:', value: `${memoryLayers} active layers` },
      { type: 'kv', label: 'Windows:', value: `${windowCount}` },
      { type: 'kv', label: 'Resolution:', value: resolution },
      { type: 'kv', label: 'Terminal:', value: 'PrathamTTY v4.2.1' },
    ];

    const maxLines = Math.max(ASCII_ART.length, infoLines.length);
    const lines = [];

    for (let i = 0; i < maxLines; i++) {
      const art = ASCII_ART[i] || ' '.repeat(30);
      const segments: TerminalSegment[] = [
        { text: `${art}   `, color: 'var(--pos-accent-brand)' }
      ];

      const info = infoLines[i];
      if (info) {
        if (info.type === 'header') {
          segments.push({
            text: info.value,
            color: 'var(--pos-accent-interactive)',
            bold: true
          });
        } else if (info.type === 'separator') {
          segments.push({
            text: info.value,
            color: 'var(--pos-text-secondary)'
          });
        } else if (info.type === 'kv') {
          segments.push({
            text: `${info.label} `,
            color: 'var(--pos-accent-interactive)',
            bold: true
          });
          segments.push({
            text: info.value,
            color: 'var(--pos-text-primary)'
          });
        }
      }

      lines.push({
        id: crypto.randomUUID(),
        segments
      });
    }

    return { lines };
  }
};
