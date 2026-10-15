import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SoundEngineClass } from '../SoundEngine';
import { SettingsStore } from '../../../apps/settings/store/SettingsStore';

describe('SoundEngine', () => {
  let engine: SoundEngineClass;

  beforeEach(() => {
    SettingsStore.resetToDefaults();
    engine = new SoundEngineClass();
  });

  it('initializes safely in headless / test environment without throwing', () => {
    expect(engine).toBeDefined();
    expect(engine.isMuted()).toBe(false);
  });

  it('respects SettingsStore tactileSound setting', () => {
    expect(engine.isMuted()).toBe(false);

    SettingsStore.updateValue('tactileSound', false);
    expect(engine.isMuted()).toBe(true);

    SettingsStore.updateValue('tactileSound', true);
    expect(engine.isMuted()).toBe(false);
  });

  it('allows manual muting via setMuted and updates SettingsStore', () => {
    engine.setMuted(true);
    expect(engine.isMuted()).toBe(true);
    expect(SettingsStore.getValue('tactileSound')).toBe(false);

    engine.setMuted(false);
    expect(engine.isMuted()).toBe(false);
    expect(SettingsStore.getValue('tactileSound')).toBe(true);
  });

  it('gracefully no-ops all sound methods without AudioContext', () => {
    expect(() => engine.playSwitchClick()).not.toThrow();
    expect(() => engine.playWindowSnap()).not.toThrow();
    expect(() => engine.playKeyTick()).not.toThrow();
    expect(() => engine.playTourStep()).not.toThrow();
  });

  it('synthesizes sounds properly when AudioContext is available', () => {
    const mockAudioParam = () => ({
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
      linearRampToValueAtTime: vi.fn(),
      value: 1,
    });

    const mockGainNode = {
      gain: mockAudioParam(),
      connect: vi.fn(),
    };

    const mockBiquadFilter = {
      type: 'lowpass',
      frequency: mockAudioParam(),
      Q: mockAudioParam(),
      connect: vi.fn(),
    };

    const mockOscillator = {
      type: 'sine',
      frequency: mockAudioParam(),
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
    };

    const mockBufferSource = {
      buffer: null,
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
    };

    const mockAudioBuffer = {
      getChannelData: vi.fn().mockReturnValue(new Float32Array(44100)),
    };

    class MockAudioContext {
      state = 'running';
      currentTime = 10;
      sampleRate = 44100;
      destination = {};
      createGain = vi.fn().mockImplementation(() => ({
        gain: mockAudioParam(),
        connect: vi.fn(),
      }));
      createBiquadFilter = vi.fn().mockImplementation(() => ({
        type: 'lowpass',
        frequency: mockAudioParam(),
        Q: mockAudioParam(),
        connect: vi.fn(),
      }));
      createOscillator = vi.fn().mockReturnValue(mockOscillator);
      createBufferSource = vi.fn().mockReturnValue(mockBufferSource);
      createBuffer = vi.fn().mockReturnValue(mockAudioBuffer);
      resume = vi.fn().mockResolvedValue(undefined);
    }

    (window as any).AudioContext = MockAudioContext;

    const audioEngine = new SoundEngineClass();

    // Test playSwitchClick
    audioEngine.playSwitchClick();
    expect(mockOscillator.start).toHaveBeenCalled();
    expect(mockOscillator.stop).toHaveBeenCalled();

    // Test playWindowSnap
    audioEngine.playWindowSnap();
    expect(mockOscillator.frequency.exponentialRampToValueAtTime).toHaveBeenCalledWith(45, expect.any(Number));

    // Test playKeyTick
    audioEngine.playKeyTick();
    expect(mockBufferSource.start).toHaveBeenCalled();

    // Test playTourStep
    audioEngine.playTourStep();
    expect(mockOscillator.frequency.setValueAtTime).toHaveBeenCalledWith(440, expect.any(Number));
    expect(mockOscillator.frequency.setValueAtTime).toHaveBeenCalledWith(660, expect.any(Number));

    // When muted, methods should not trigger oscillator start
    audioEngine.setMuted(true);
    mockOscillator.start.mockClear();
    audioEngine.playSwitchClick();
    expect(mockOscillator.start).not.toHaveBeenCalled();

    // Clean up
    delete (window as any).AudioContext;
  });
});
