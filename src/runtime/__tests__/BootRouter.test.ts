import { describe, it, expect, beforeEach } from 'vitest';
import { BootRouter, parseBootParams, BootRouterClass } from '../BootRouter';

describe('BootRouter', () => {
  let router: BootRouterClass;

  beforeEach(() => {
    router = new BootRouterClass();
  });

  describe('query parameter parsing', () => {
    it('parses ?mode=recruiter and activates tour by default', () => {
      const config = router.parse('?mode=recruiter');
      expect(config.mode).toBe('recruiter');
      expect(config.tour).toBe(true);
      expect(config.rawParams.mode).toBe('recruiter');
    });

    it('parses ?tour=true and sets tour flag', () => {
      const config = router.parse('?tour=true');
      expect(config.tour).toBe(true);
      expect(config.rawParams.tour).toBe('true');
    });

    it('parses ?tour=false and preserves false when not in recruiter mode', () => {
      const config = router.parse('?tour=false');
      expect(config.tour).toBe(false);
      expect(config.mode).toBe('default');
    });

    it('parses ?app=queue correctly', () => {
      const config = router.parse('?app=queue');
      expect(config.app).toBe('queue');
      expect(config.rawParams.app).toBe('queue');
    });

    it('parses ?app=resume correctly', () => {
      const config = router.parse('?app=resume');
      expect(config.app).toBe('resume');
      expect(config.rawParams.app).toBe('resume');
    });

    it('parses ?shell=macos correctly', () => {
      const config = router.parse('?shell=macos');
      expect(config.shell).toBe('macos');
      expect(config.rawParams.shell).toBe('macos');
    });

    it('parses ?shell=windows correctly', () => {
      const config = router.parse('?shell=windows');
      expect(config.shell).toBe('windows');
      expect(config.rawParams.shell).toBe('windows');
    });

    it('parses complex compound query parameter strings', () => {
      const config = router.parse('?mode=recruiter&tour=true&app=resume&shell=macos&custom=val123');
      expect(config.mode).toBe('recruiter');
      expect(config.tour).toBe(true);
      expect(config.app).toBe('resume');
      expect(config.shell).toBe('macos');
      expect(config.rawParams.custom).toBe('val123');
    });

    it('handles query strings without leading ? gracefully', () => {
      const config = router.parse('mode=recruiter&app=queue');
      expect(config.mode).toBe('recruiter');
      expect(config.app).toBe('queue');
    });

    it('handles URLSearchParams instance as input', () => {
      const params = new URLSearchParams('shell=windows&app=resume');
      const config = router.parse(params);
      expect(config.shell).toBe('windows');
      expect(config.app).toBe('resume');
    });

    it('provides defaults for empty or missing query string', () => {
      const config = router.parse('');
      expect(config.mode).toBe('default');
      expect(config.tour).toBe(false);
      expect(config.app).toBeNull();
      expect(config.shell).toBeNull();
      expect(config.rawParams).toEqual({});
    });
  });

  describe('helper methods and URL builder', () => {
    it('hasParam and getParam correctly check parameters', () => {
      // Mock window.location
      const originalLocation = window.location;
      delete (window as any).location;
      (window as any).location = { search: '?mode=recruiter&app=queue' } as any;

      expect(BootRouter.hasParam('mode')).toBe(true);
      expect(BootRouter.hasParam('nonexistent')).toBe(false);
      expect(BootRouter.getParam('app')).toBe('queue');
      expect(BootRouter.getParam('missing')).toBeNull();

      (window as any).location = originalLocation;
    });

    it('buildUrl produces valid search query string', () => {
      const url = router.buildUrl({
        mode: 'recruiter',
        app: 'resume',
        shell: 'macos',
      });
      expect(url).toContain('mode=recruiter');
      expect(url).toContain('app=resume');
      expect(url).toContain('shell=macos');
    });

    it('exported parseBootParams function behaves identically', () => {
      const config = parseBootParams('?app=resume&shell=windows');
      expect(config.app).toBe('resume');
      expect(config.shell).toBe('windows');
    });
  });
});
