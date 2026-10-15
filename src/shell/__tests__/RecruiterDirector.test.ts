import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RecruiterDirectorController, RecruiterStage, DEFAULT_RECRUITER_STAGES } from '../RecruiterDirector';
import { SoundEngine } from '../../design-system/audio/SoundEngine';

describe('RecruiterDirectorController', () => {
  let controller: RecruiterDirectorController;
  let playTourStepSpy: any;

  beforeEach(() => {
    playTourStepSpy = vi.spyOn(SoundEngine, 'playTourStep').mockImplementation(() => {});
    controller = new RecruiterDirectorController();
  });

  afterEach(() => {
    controller.reset();
    vi.restoreAllMocks();
  });

  describe('stage initialization', () => {
    it('initializes with default stages and inactive tour state', () => {
      const state = controller.getState();
      expect(state.isActive).toBe(false);
      expect(state.currentStageIndex).toBe(-1);
      expect(state.currentStage).toBeNull();
      expect(state.totalStages).toBe(DEFAULT_RECRUITER_STAGES.length);
      expect(state.totalStages).toBeGreaterThan(0);
    });

    it('allows custom stages to be passed in constructor', () => {
      const customStages: RecruiterStage[] = [
        { id: 'custom-1', title: 'Custom 1', description: 'Desc 1' },
        { id: 'custom-2', title: 'Custom 2', description: 'Desc 2' },
      ];
      const customController = new RecruiterDirectorController(customStages);
      expect(customController.getStages()).toHaveLength(2);
      expect(customController.getState().totalStages).toBe(2);
    });

    it('allows stages to be updated dynamically via setStages', () => {
      const newStages: RecruiterStage[] = [
        { id: 's1', title: 'Stage 1', description: 'Test' },
      ];
      controller.setStages(newStages);
      expect(controller.getStages()).toHaveLength(1);
      expect(controller.getState().totalStages).toBe(1);
    });
  });

  describe('startTour and navigation', () => {
    it('starts tour at stage 0 by default and plays acoustic feedback', () => {
      controller.startTour();
      const state = controller.getState();

      expect(state.isActive).toBe(true);
      expect(state.currentStageIndex).toBe(0);
      expect(state.currentStage?.id).toBe(DEFAULT_RECRUITER_STAGES[0].id);
      expect(controller.getCurrentStage()?.id).toBe(DEFAULT_RECRUITER_STAGES[0].id);
      expect(playTourStepSpy).toHaveBeenCalledTimes(1);
    });

    it('can start tour at a specific stage index', () => {
      controller.startTour(2);
      const state = controller.getState();

      expect(state.isActive).toBe(true);
      expect(state.currentStageIndex).toBe(2);
      expect(state.currentStage?.id).toBe(DEFAULT_RECRUITER_STAGES[2].id);
      expect(playTourStepSpy).toHaveBeenCalledTimes(1);
    });

    it('advances sequentially through stages with sound feedback', () => {
      controller.startTour(0);

      const hasNext1 = controller.advance();
      expect(hasNext1).toBe(true);
      expect(controller.getState().currentStageIndex).toBe(1);
      expect(playTourStepSpy).toHaveBeenCalledTimes(2);

      const hasNext2 = controller.advance();
      expect(hasNext2).toBe(true);
      expect(controller.getState().currentStageIndex).toBe(2);
      expect(playTourStepSpy).toHaveBeenCalledTimes(3);
    });

    it('completes and stops tour when advancing past final stage', () => {
      const finalIndex = controller.getStages().length - 1;
      controller.startTour(finalIndex);

      const hasNext = controller.advance();
      expect(hasNext).toBe(false);

      const state = controller.getState();
      expect(state.isActive).toBe(false);
      expect(state.currentStageIndex).toBe(-1);
      expect(state.currentStage).toBeNull();
    });

    it('supports navigating to previous stage', () => {
      controller.startTour(2);

      const canGoPrev = controller.previous();
      expect(canGoPrev).toBe(true);
      expect(controller.getState().currentStageIndex).toBe(1);

      // Cannot go before 0
      controller.goToStage(0);
      expect(controller.previous()).toBe(false);
      expect(controller.getState().currentStageIndex).toBe(0);
    });

    it('allows jumping directly to valid stage with bounds checking', () => {
      controller.startTour();

      expect(controller.goToStage(3)).toBe(true);
      expect(controller.getState().currentStageIndex).toBe(3);

      // Out of bounds
      expect(controller.goToStage(-1)).toBe(false);
      expect(controller.goToStage(999)).toBe(false);
      expect(controller.getState().currentStageIndex).toBe(3);
    });
  });

  describe('stopTour and escape interruption', () => {
    it('stops tour explicitly and resets active state', () => {
      controller.startTour(1);
      expect(controller.getState().isActive).toBe(true);

      controller.stopTour();
      const state = controller.getState();
      expect(state.isActive).toBe(false);
      expect(state.currentStageIndex).toBe(-1);
      expect(controller.getCurrentStage()).toBeNull();
    });

    it('interrupts tour upon handleKeyDown with Escape key', () => {
      controller.startTour(2);
      expect(controller.getState().isActive).toBe(true);

      controller.handleKeyDown(new KeyboardEvent('keydown', { key: 'Escape' }));
      expect(controller.getState().isActive).toBe(false);
      expect(controller.getState().currentStageIndex).toBe(-1);
    });

    it('interrupts tour upon window Escape keydown event', () => {
      controller.startTour(1);
      expect(controller.getState().isActive).toBe(true);

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      expect(controller.getState().isActive).toBe(false);
    });

    it('ignores non-escape keydown events', () => {
      controller.startTour(1);
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      expect(controller.getState().isActive).toBe(true);
      expect(controller.getState().currentStageIndex).toBe(1);
    });
  });

  describe('subscriber notifications', () => {
    it('notifies subscribers on state transitions and allows unsubscription', () => {
      const listener = vi.fn();
      const unsubscribe = controller.subscribe(listener);

      // Initial call on subscription
      expect(listener).toHaveBeenCalledWith(expect.objectContaining({ isActive: false }));

      controller.startTour(0);
      expect(listener).toHaveBeenCalledWith(expect.objectContaining({ isActive: true, currentStageIndex: 0 }));

      controller.advance();
      expect(listener).toHaveBeenCalledWith(expect.objectContaining({ isActive: true, currentStageIndex: 1 }));

      unsubscribe();
      controller.advance();
      // Should not receive further updates after unsubscribe
      expect(listener).toHaveBeenCalledTimes(3);
    });
  });
});
