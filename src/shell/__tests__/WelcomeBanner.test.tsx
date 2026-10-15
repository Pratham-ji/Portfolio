import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { WelcomeBanner } from '../WelcomeBanner';
import { RecruiterDirectorController } from '../RecruiterDirector';
import { PaperViewerStore } from '../../apps/PaperViewer/store/PaperViewerStore';
import { ApplicationRegistry } from '../../apps/registry/ApplicationRegistry';

describe('WelcomeBanner (Beginner-Friendly Onboarding)', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    RecruiterDirectorController.stopTour();
    vi.restoreAllMocks();
  });

  it('renders welcome banner with header and 3 action pills by default', () => {
    render(<WelcomeBanner />);

    expect(screen.getByText(/Welcome to PrathamOS — Choose how you'd like to explore:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Auto-Play 30s Tour/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Fullscreen Resume/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /View System Architectures/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Dismiss welcome banner/i })).toBeInTheDocument();
  });

  it('dismisses banner when clicking [×] dismiss button', () => {
    const onDismiss = vi.fn();
    render(<WelcomeBanner onDismiss={onDismiss} />);

    const dismissBtn = screen.getByRole('button', { name: /Dismiss welcome banner/i });
    fireEvent.click(dismissBtn);

    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/Welcome to PrathamOS/i)).not.toBeInTheDocument();
    expect(sessionStorage.getItem('prathamos_welcome_dismissed')).toBe('true');
  });

  it('does not render if previously dismissed in session', () => {
    sessionStorage.setItem('prathamos_welcome_dismissed', 'true');
    const { container } = render(<WelcomeBanner />);
    expect(container.firstChild).toBeNull();
  });

  it('starts Recruiter Tour and hides banner when clicking "Auto-Play 30s Tour"', async () => {
    vi.useFakeTimers();
    const startTourSpy = vi.spyOn(RecruiterDirectorController, 'startTour').mockImplementation(() => {});

    render(<WelcomeBanner />);
    const tourBtn = screen.getByRole('button', { name: /Auto-Play 30s Tour/i });
    fireEvent.click(tourBtn);

    expect(screen.queryByText(/Welcome to PrathamOS/i)).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(startTourSpy).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('launches PaperViewer with Resume when clicking "Fullscreen Resume"', () => {
    const openByPathSpy = vi.spyOn(PaperViewerStore, 'openByPathOrName').mockImplementation(() => {});
    const focusOrLaunchSpy = vi.spyOn(ApplicationRegistry, 'focusOrLaunch').mockImplementation(() => 'win-paper');

    render(<WelcomeBanner />);
    const resumeBtn = screen.getByRole('button', { name: /Fullscreen Resume/i });
    fireEvent.click(resumeBtn);

    expect(screen.queryByText(/Welcome to PrathamOS/i)).not.toBeInTheDocument();
    expect(openByPathSpy).toHaveBeenCalledWith('Resume_Prathamraj_Giri.paper');
    expect(focusOrLaunchSpy).toHaveBeenCalledWith('prathamos.paper', expect.any(Object));
  });

  it('launches EngineeringHub with architecture tab when clicking "View System Architectures"', () => {
    const focusOrLaunchSpy = vi.spyOn(ApplicationRegistry, 'focusOrLaunch').mockImplementation(() => 'win-eng');

    render(<WelcomeBanner />);
    const archBtn = screen.getByRole('button', { name: /View System Architectures/i });
    fireEvent.click(archBtn);

    expect(screen.queryByText(/Welcome to PrathamOS/i)).not.toBeInTheDocument();
    expect(focusOrLaunchSpy).toHaveBeenCalledWith('prathamos.engineering', {
      tab: 'architecture',
      bounds: { x: 80, y: 50, width: 880, height: 640 }
    });
  });

  it('automatically hides when RecruiterDirector tour starts externally', () => {
    render(<WelcomeBanner />);
    expect(screen.getByText(/Welcome to PrathamOS/i)).toBeInTheDocument();

    act(() => {
      // Simulate tour starting
      RecruiterDirectorController.startTour();
    });

    expect(screen.queryByText(/Welcome to PrathamOS/i)).not.toBeInTheDocument();
  });
});
