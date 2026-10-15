import { useState, useEffect, useCallback } from 'react';
import { SettingsStore } from '../../apps/settings/store/SettingsStore';

/**
 * Procedural Zero-Asset SoundEngine for PrathamOS.
 * Synthesizes all acoustic effects dynamically in real-time via the Web Audio API.
 * Contains ZERO static audio files (.mp3, .wav, .ogg).
 * SSR-safe, test-safe, and Autoplay-policy compliant.
 */
export class SoundEngineClass {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private manualMuted: boolean = false;
  private unlockListenerAttached: boolean = false;

  constructor() {
    this.setupAutoplayUnlock();
  }

  /**
   * Lazily registers pointerdown and keydown listeners to resume AudioContext
   * in compliance with modern browser autoplay policies.
   */
  private setupAutoplayUnlock(): void {
    if (typeof window === 'undefined' || this.unlockListenerAttached) return;

    const unlock = () => {
      this.ensureContext();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      this.unlockListenerAttached = false;
    };

    try {
      window.addEventListener('pointerdown', unlock, { passive: true, once: true });
      window.addEventListener('keydown', unlock, { passive: true, once: true });
      this.unlockListenerAttached = true;
    } catch {
      // Ignored in non-browser environments
    }
  }

  /**
   * Safe, lazy AudioContext creation with fallbacks.
   * Returns null if running in SSR, headless tests, or if Web Audio is unsupported.
   */
  public ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) return null;

    if (!this.ctx) {
      try {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      } catch {
        return null;
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  /**
   * Generates a reusable 1-second white noise buffer.
   * Cached to prevent garbage collection spikes during rapid keystroke ticks.
   */
  private getNoiseBuffer(ctx: AudioContext): AudioBuffer | null {
    if (this.noiseBuffer) return this.noiseBuffer;

    try {
      const sampleRate = ctx.sampleRate || 44100;
      const buffer = ctx.createBuffer(1, sampleRate, sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < sampleRate; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      this.noiseBuffer = buffer;
      return buffer;
    } catch {
      return null;
    }
  }

  /**
   * Returns whether audio playback is muted either manually or via SettingsStore.
   */
  public isMuted(): boolean {
    if (this.manualMuted) return true;
    try {
      const tactileSound = SettingsStore.getValue<boolean>('tactileSound');
      if (tactileSound === false) return true;
    } catch {
      // SettingsStore might not be initialized
    }
    return false;
  }

  /**
   * Explicitly set the muted state and propagate to SettingsStore.
   */
  public setMuted(muted: boolean): void {
    this.manualMuted = muted;
    try {
      SettingsStore.updateValue('tactileSound', !muted);
    } catch {
      // noop
    }
  }

  /**
   * Switch Click Sound:
   * 10ms bandpass-filtered noise burst (BiquadFilterNode bandpass 1800Hz, Q=3)
   * + rapid 160Hz -> 80Hz sine drop with exponential decay envelope.
   * Simulates a tactile, matte anodized aluminum toggle switch.
   */
  public playSwitchClick(): void {
    if (this.isMuted()) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;

      // 1. 10ms bandpass noise burst (metallic contact)
      const noiseBuffer = this.getNoiseBuffer(ctx);
      if (noiseBuffer) {
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(1800, now);
        noiseFilter.Q.setValueAtTime(3, now);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.12, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.010);

        noiseSource.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.masterGain);

        const offset = Math.random() * 0.9;
        noiseSource.start(now, offset, 0.010);
        noiseSource.stop(now + 0.010);
      }

      // 2. Rapid 160Hz -> 80Hz sine drop (aluminum housing body thud)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.012);

      oscGain.gain.setValueAtTime(0.16, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.018);
    } catch {
      // Graceful error suppression
    }
  }

  /**
   * Window Snap Sound:
   * 18ms low-pass filtered (320Hz) 110Hz -> 45Hz dampened felt thud with smooth release.
   * Fired when a window opens, closes, minimizes, maximizes, or snaps to edge.
   */
  public playWindowSnap(): void {
    if (this.isMuted()) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.018);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, now);
      filter.Q.setValueAtTime(1.0, now);

      // Dampened felt thud envelope: smooth 3ms attack + exponential decay
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.24, now + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.024);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch {
      // Graceful error suppression
    }
  }

  /**
   * Key Tick Sound:
   * Ultra-subtle 6ms dampened acoustic tap (high-frequency filtered burst at 2400Hz, low gain ~0.04).
   * Fired on terminal keystrokes.
   */
  public playKeyTick(): void {
    if (this.isMuted()) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;

      const noiseBuffer = this.getNoiseBuffer(ctx);
      if (noiseBuffer) {
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2400, now);
        filter.Q.setValueAtTime(2.5, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.006);

        noiseSource.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        const offset = Math.random() * 0.9;
        noiseSource.start(now, offset, 0.006);
        noiseSource.stop(now + 0.006);
      }
    } catch {
      // Graceful error suppression
    }
  }

  /**
   * Tour Step Sound:
   * Gentle, warm harmonic fifth interval (root 440Hz + fifth 660Hz dual sine oscillators
   * with 150ms gentle exponential decay).
   * Fired when advancing stages during onboarding tours.
   */
  public playTourStep(): void {
    if (this.isMuted()) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      const duration = 0.150; // 150ms

      const oscRoot = ctx.createOscillator();
      const oscFifth = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscRoot.type = 'sine';
      oscRoot.frequency.setValueAtTime(440, now); // A4 root

      oscFifth.type = 'sine';
      oscFifth.frequency.setValueAtTime(660, now); // E5 perfect fifth

      // Gentle exponential decay envelope with smooth 6ms attack to prevent pop
      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.linearRampToValueAtTime(0.12, now + 0.006);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      oscRoot.connect(gainNode);
      oscFifth.connect(gainNode);
      gainNode.connect(this.masterGain);

      oscRoot.start(now);
      oscFifth.start(now);
      oscRoot.stop(now + duration);
      oscFifth.stop(now + duration);
    } catch {
      // Graceful error suppression
    }
  }
}

export const SoundEngine = new SoundEngineClass();
export default SoundEngine;

/**
 * React hook to interact with SoundEngine with reactive mute state.
 */
export function useSound() {
  const [muted, setMutedState] = useState(() => SoundEngine.isMuted());

  useEffect(() => {
    const unsub = SettingsStore.subscribe(() => {
      setMutedState(SoundEngine.isMuted());
    });
    return unsub;
  }, []);

  const setMuted = useCallback((val: boolean) => {
    SoundEngine.setMuted(val);
    setMutedState(SoundEngine.isMuted());
  }, []);

  const playSwitchClick = useCallback(() => SoundEngine.playSwitchClick(), []);
  const playWindowSnap = useCallback(() => SoundEngine.playWindowSnap(), []);
  const playKeyTick = useCallback(() => SoundEngine.playKeyTick(), []);
  const playTourStep = useCallback(() => SoundEngine.playTourStep(), []);

  return {
    playSwitchClick,
    playWindowSnap,
    playKeyTick,
    playTourStep,
    isMuted: muted,
    setMuted
  };
}
