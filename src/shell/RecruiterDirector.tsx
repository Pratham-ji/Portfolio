import React, { useEffect, useState } from 'react';
import { ApplicationRegistry } from '../apps/registry/ApplicationRegistry';
import { PaperViewerStore } from '../apps/PaperViewer/store/PaperViewerStore';
import { TerminalStore } from '../apps/terminal/runtime/TerminalStore';
import { toast } from '../design-system/components/Toast';
import { SoundEngine } from '../design-system/audio/SoundEngine';

export interface RecruiterStage {
  id: string;
  title: string;
  description: string;
  targetApp?: string;
  durationMs?: number;
}

export interface RecruiterTourState {
  isActive: boolean;
  currentStageIndex: number;
  currentStage: RecruiterStage | null;
  totalStages: number;
  isPaused: boolean;
  stageProgress: number; // 0 to 100
}

export const DEFAULT_RECRUITER_STAGES: RecruiterStage[] = [
  {
    id: 'architecture',
    title: 'Stage 1 of 4: Systems Architecture',
    description: 'Queue (Fund My Crazy 2026) & B2B EdTech RAG + AR distributed architecture with live inspector drawer',
    targetApp: 'prathamos.engineering',
    durationMs: 8000,
  },
  {
    id: 'terminal',
    title: 'Stage 2 of 4: Live ChaiScript Execution',
    description: 'Simulating ChaiScript AST pipeline & streaming byte-code evaluation in PrathamTTY runtime',
    targetApp: 'prathamos.terminal',
    durationMs: 8000,
  },
  {
    id: 'telemetry',
    title: 'Stage 3 of 4: Algorithmic Telemetry',
    description: '600+ LeetCode problem distribution matrix and C++ 62.5x speedup benchmark telemetry',
    targetApp: 'prathamos.engineering',
    durationMs: 7000,
  },
  {
    id: 'paper',
    title: 'Stage 4 of 4: Resume & Direct Contact',
    description: 'Candidate credentials, production systems experience, and direct contact details',
    targetApp: 'prathamos.paper',
    durationMs: 7000,
  },
];

export class RecruiterDirectorController {
  public static instance: RecruiterDirectorController = new RecruiterDirectorController();

  private stages: RecruiterStage[];
  private currentStageIndex: number = -1;
  private isActive: boolean = false;
  private isPaused: boolean = false;
  private stageProgress: number = 0;
  private listeners: Set<(state: RecruiterTourState) => void> = new Set();
  private boundKeyDownHandler: ((e: KeyboardEvent) => void) | null = null;
  private timers: NodeJS.Timeout[] = [];
  private progressInterval: NodeJS.Timeout | null = null;
  private stageStartTime: number = 0;
  private currentStageDuration: number = 8000;

  constructor(initialStages: RecruiterStage[] = DEFAULT_RECRUITER_STAGES) {
    this.stages = [...initialStages];
  }

  public static startTour(startStageIndex: number = 0): void {
    RecruiterDirectorController.instance.startTour(startStageIndex);
  }

  public static stopTour(): void {
    RecruiterDirectorController.instance.stopTour();
  }

  public static getState(): RecruiterTourState {
    return RecruiterDirectorController.instance.getState();
  }

  public static subscribe(listener: (state: RecruiterTourState) => void): () => void {
    return RecruiterDirectorController.instance.subscribe(listener);
  }

  public getStages(): RecruiterStage[] {
    return [...this.stages];
  }

  public setStages(newStages: RecruiterStage[]): void {
    this.stages = [...newStages];
    if (this.currentStageIndex >= this.stages.length) {
      this.currentStageIndex = this.stages.length - 1;
    }
    this.notify();
  }

  public getState(): RecruiterTourState {
    const currentStage = this.currentStageIndex >= 0 && this.currentStageIndex < this.stages.length
      ? this.stages[this.currentStageIndex] ?? null
      : null;

    return {
      isActive: this.isActive,
      currentStageIndex: this.currentStageIndex,
      currentStage,
      totalStages: this.stages.length,
      isPaused: this.isPaused,
      stageProgress: this.stageProgress,
    };
  }

  public getCurrentStage(): RecruiterStage | null {
    if (!this.isActive || this.currentStageIndex < 0 || this.currentStageIndex >= this.stages.length) {
      return null;
    }
    return this.stages[this.currentStageIndex] ?? null;
  }

  public startTour(startStageIndex: number = 0): void {
    if (this.stages.length === 0) return;

    this.clearAllTimers();
    this.isActive = true;
    this.isPaused = false;
    this.currentStageIndex = Math.max(0, Math.min(startStageIndex, this.stages.length - 1));

    try {
      SoundEngine.playTourStep();
    } catch {
      // Safe no-op in headless
    }

    this.attachKeyListeners();
    this.runStage(this.currentStageIndex);
  }

  private runStage(stageIndex: number): void {
    const stage = this.stages[stageIndex];
    if (!stage) return;

    const duration = stage.durationMs || 7500;
    this.currentStageDuration = duration;
    this.stageStartTime = Date.now();
    this.stageProgress = 0;
    this.notify();

    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    this.progressInterval = setInterval(() => {
      if (!this.isActive || this.isPaused) return;
      const elapsed = Date.now() - this.stageStartTime;
      this.stageProgress = Math.min(100, Math.max(0, (elapsed / this.currentStageDuration) * 100));
      this.notify();
    }, 40);

    // Choreographed stage actions
    if (stage.id === 'architecture' || stageIndex === 0) {
      this.executeStage1();
    } else if (stage.id === 'terminal' || stageIndex === 1) {
      this.executeStage2();
    } else if (stage.id === 'telemetry' || stageIndex === 2) {
      this.executeStage3();
    } else if (stage.id === 'paper' || stageIndex === 3) {
      this.executeStage4();
    }

    // Schedule next stage transition automatically
    const tNext = setTimeout(() => {
      if (!this.isActive) return;
      this.advance();
    }, duration);
    this.timers.push(tNext);
  }

  private executeStage1(): void {
    ApplicationRegistry.focusOrLaunch('prathamos.engineering', { tab: 'architecture' });
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('prathamos:engineering-tab', { detail: { tab: 'architecture' } }));
      // 0s: select Queue
      window.dispatchEvent(new CustomEvent('prathamos:arch-select', { detail: { systemId: 'queue' } }));

      // 4s: cycle to EdTech RAG + AR
      const t = setTimeout(() => {
        if (!this.isActive) return;
        window.dispatchEvent(new CustomEvent('prathamos:arch-select', { detail: { systemId: 'edtech-rag' } }));
      }, 4000);
      this.timers.push(t);
    }
  }

  private executeStage2(): void {
    ApplicationRegistry.focusOrLaunch('prathamos.terminal');

    const cmdText = 'chai run demo.chai';
    const totalTypingTime = 1400;
    const charDelay = Math.floor(totalTypingTime / cmdText.length);

    for (let i = 1; i <= cmdText.length; i++) {
      const t = setTimeout(() => {
        if (!this.isActive) return;
        const currentSlice = cmdText.slice(0, i);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('prathamos:terminal-simulate-input', { detail: { input: currentSlice } }));
        }
      }, 400 + i * charDelay);
      this.timers.push(t);
    }

    const tExec = setTimeout(() => {
      if (!this.isActive) return;
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('prathamos:terminal-simulate-input', { detail: { input: '' } }));
      }

      TerminalStore.appendHistory([{
        id: crypto.randomUUID(),
        isInput: true,
        segments: [
          { text: 'pratham@prathamos', color: 'var(--pos-color-success, #30D158)' },
          { text: ':' },
          { text: '~', color: 'var(--pos-accent-interactive, #0A84FF)' },
          { text: '$ ' },
          { text: cmdText }
        ]
      }]);

      const logs = [
        { delay: 300, text: '[loader]    Loading demo.chai (AST compiler v2.4)...', color: 'var(--pos-text-secondary, #8E8E93)' },
        { delay: 800, text: '[tokenizer] 12 lexical tokens emitted in 0.42ms', color: 'var(--pos-text-secondary, #8E8E93)' },
        { delay: 1400, text: '[parser]    Abstract Syntax Tree: Program(3 statements, depth=2)', color: 'var(--pos-accent-interactive, #0A84FF)' },
        { delay: 2000, text: '[opt]       Constant folding & tail-call elimination pass OK', color: 'var(--pos-text-secondary, #8E8E93)' },
        { delay: 2600, text: '[eval]      let x = 42', color: 'var(--pos-text-secondary, #8E8E93)' },
        { delay: 3100, text: '[eval]      let msg = "Hello from ChaiScript!"', color: 'var(--pos-text-secondary, #8E8E93)' },
        { delay: 3600, text: '[eval]      print(msg)', color: 'var(--pos-text-secondary, #8E8E93)' },
        { delay: 4100, text: '→ Hello from ChaiScript!', color: 'var(--pos-color-success, #30D158)' },
        { delay: 4600, text: '→ Program exited cleanly with status code 0 [Execution: 3.8ms]', color: 'var(--pos-color-success, #30D158)' }
      ];

      logs.forEach(log => {
        const tLog = setTimeout(() => {
          if (!this.isActive) return;
          TerminalStore.appendHistory([{
            id: crypto.randomUUID(),
            segments: [{ text: log.text, color: log.color }]
          }]);
        }, log.delay);
        this.timers.push(tLog);
      });
    }, 2000);
    this.timers.push(tExec);
  }

  private executeStage3(): void {
    ApplicationRegistry.focusOrLaunch('prathamos.engineering', { tab: 'telemetry' });
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('prathamos:engineering-tab', { detail: { tab: 'telemetry' } }));
    }
  }

  private executeStage4(): void {
    PaperViewerStore.openFileByName('Resume_Prathamraj_Giri.paper');
    ApplicationRegistry.focusOrLaunch('prathamos.paper');

    const tToast = setTimeout(() => {
      if (!this.isActive) return;
      toast.show('Tour Complete', "Thank you for reviewing Pratham's work! Contact: prathamrajgiri@gmail.com");
    }, 6200);
    this.timers.push(tToast);
  }

  public advance(): boolean {
    if (!this.isActive) return false;

    this.clearAllTimers();

    if (this.currentStageIndex + 1 < this.stages.length) {
      this.currentStageIndex++;
      try {
        SoundEngine.playTourStep();
      } catch {
        // Safe no-op in headless
      }
      this.runStage(this.currentStageIndex);
      return true;
    } else {
      this.stopTour();
      return false;
    }
  }

  public previous(): boolean {
    if (!this.isActive || this.currentStageIndex <= 0) return false;

    this.clearAllTimers();
    this.currentStageIndex--;
    try {
      SoundEngine.playTourStep();
    } catch {
      // Safe no-op in headless
    }
    this.runStage(this.currentStageIndex);
    return true;
  }

  public goToStage(index: number): boolean {
    if (index < 0 || index >= this.stages.length) return false;

    this.clearAllTimers();
    this.isActive = true;
    this.currentStageIndex = index;
    try {
      SoundEngine.playTourStep();
    } catch {
      // Safe no-op in headless
    }
    this.attachKeyListeners();
    this.runStage(this.currentStageIndex);
    return true;
  }

  private clearAllTimers(): void {
    this.timers.forEach(t => clearTimeout(t));
    this.timers = [];

    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('prathamos:terminal-simulate-input', { detail: { input: '' } }));
    }
  }

  public stopTour(): void {
    this.clearAllTimers();
    this.isActive = false;
    this.isPaused = false;
    this.currentStageIndex = -1;
    this.stageProgress = 0;
    this.detachKeyListeners();
    this.notify();
  }

  public pauseTour(): void {
    if (!this.isActive) return;
    this.isPaused = true;
    this.notify();
  }

  public resumeTour(): void {
    if (!this.isActive) return;
    this.isPaused = false;
    this.notify();
  }

  public handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      this.stopTour();
    }
  };

  private attachKeyListeners(): void {
    if (typeof window === 'undefined') return;
    this.detachKeyListeners();
    this.boundKeyDownHandler = this.handleKeyDown;
    window.addEventListener('keydown', this.boundKeyDownHandler);
  }

  private detachKeyListeners(): void {
    if (typeof window === 'undefined' || !this.boundKeyDownHandler) return;
    window.removeEventListener('keydown', this.boundKeyDownHandler);
    this.boundKeyDownHandler = null;
  }

  public subscribe(listener: (state: RecruiterTourState) => void): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  public reset(): void {
    this.stopTour();
    this.listeners.clear();
  }

  private notify(): void {
    const state = this.getState();
    this.listeners.forEach((listener) => {
      try {
        listener(state);
      } catch (err) {
        console.error('Error notifying RecruiterDirector listener:', err);
      }
    });
  }
}

export const RecruiterDirector: React.FC = () => {
  const [tourState, setTourState] = useState<RecruiterTourState>(() => RecruiterDirectorController.getState());

  useEffect(() => {
    return RecruiterDirectorController.subscribe(setTourState);
  }, []);

  if (!tourState.isActive || !tourState.currentStage) return null;

  return (
    <div
      role="dialog"
      aria-label="Recruiter Tour HUD"
      style={{
        position: 'fixed',
        bottom: 96,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 45000,
        width: 'min(620px, calc(100vw - 32px))',
        backgroundColor: 'rgba(18, 20, 24, 0.90)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.16)',
        borderRadius: 18,
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(10, 132, 255, 0.25), 0 0 35px rgba(10, 132, 255, 0.15)',
        padding: '16px 22px',
        color: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        userSelect: 'none',
        pointerEvents: 'auto',
        animation: 'hudFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <style>{`
        @keyframes hudFadeIn {
          from { opacity: 0; transform: translate(-50%, 16px) scale(0.97); }
          to { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        @keyframes hudPulseLed {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.65; }
        }
      `}</style>

      {/* Top Header Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#0A84FF',
              boxShadow: '0 0 8px #0A84FF',
              animation: 'hudPulseLed 1.5s infinite ease-in-out'
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase', color: '#0A84FF' }}>
            {tourState.currentStage.title}
          </span>
        </div>

        <button
          onClick={() => RecruiterDirectorController.stopTour()}
          aria-label="Exit Tour"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: 8,
            padding: '4px 10px',
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
          }}
        >
          <span>Exit Tour</span>
          <kbd
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              padding: '1px 5px',
              borderRadius: 4,
              fontSize: 10,
              fontFamily: 'monospace'
            }}
          >
            Esc
          </kbd>
        </button>
      </div>

      {/* Description */}
      <div style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.72)', lineHeight: 1.45, marginBottom: 12 }}>
        {tourState.currentStage.description}
      </div>

      {/* Progress Track */}
      <div style={{ position: 'relative', width: '100%', height: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2, overflow: 'hidden' }}>
        <div
          style={{
            width: `${tourState.stageProgress}%`,
            height: '100%',
            backgroundColor: '#0A84FF',
            boxShadow: '0 0 10px #0A84FF',
            borderRadius: 2,
            transition: 'width 0.04s linear'
          }}
        />
      </div>

      {/* Stage Dots Indicator */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '0 2px' }}>
        {tourState.totalStages > 0 && Array.from({ length: tourState.totalStages }).map((_, step) => {
          const isPassed = step < tourState.currentStageIndex;
          const isCurrent = step === tourState.currentStageIndex;
          const label = step === 0 ? 'Architecture' : step === 1 ? 'ChaiScript' : step === 2 ? 'Telemetry' : step === 3 ? 'Resume' : `Stage ${step + 1}`;
          return (
            <div
              key={step}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 11,
                color: isCurrent ? '#0A84FF' : isPassed ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.3)',
                fontWeight: isCurrent ? 600 : 400
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: isCurrent ? '#0A84FF' : isPassed ? '#30D158' : 'rgba(255, 255, 255, 0.25)',
                  boxShadow: isCurrent ? '0 0 6px #0A84FF' : 'none'
                }}
              />
              <span>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecruiterDirector;
