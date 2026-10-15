import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LockScreen } from './index';
import { RecruiterDirectorController } from '../RecruiterDirector';
import { PaperViewerStore } from '../../apps/PaperViewer/store/PaperViewerStore';
import { ApplicationRegistry } from '../../apps/registry/ApplicationRegistry';

describe('LockScreen (Optical ID Biometric Portal)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders default unlocked (returns null) when defaultLocked is false', () => {
    const { container } = render(<LockScreen defaultLocked={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders Optical ID portal with clock, scanner text, and 3 entry cards when locked', () => {
    render(<LockScreen defaultLocked={true} />);

    // Verification badges
    expect(screen.getByText(/Optical ID Verified/i)).toBeInTheDocument();
    expect(screen.getByText(/Recruiter & Guest Access Granted/i)).toBeInTheDocument();

    // 3 Entry Cards
    expect(screen.getByRole('button', { name: /30s Guided Recruiter Tour/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Read Interactive Resume/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enter Desktop Workspace/i })).toBeInTheDocument();

    // No password input exists
    expect(screen.queryByPlaceholderText(/password/i)).not.toBeInTheDocument();
  });

  it('unlocks when "Enter Desktop Workspace" card is clicked', () => {
    const onUnlock = vi.fn();
    render(<LockScreen defaultLocked={true} onUnlock={onUnlock} />);

    const desktopBtn = screen.getByRole('button', { name: /Enter Desktop Workspace/i });
    fireEvent.click(desktopBtn);

    expect(onUnlock).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/Optical ID Verified/i)).not.toBeInTheDocument();
  });

  it('unlocks and starts tour when "30s Guided Recruiter Tour" card is clicked', () => {
    const startTourSpy = vi.spyOn(RecruiterDirectorController, 'startTour').mockImplementation(() => {});
    const onUnlock = vi.fn();
    render(<LockScreen defaultLocked={true} onUnlock={onUnlock} />);

    const tourBtn = screen.getByRole('button', { name: /30s Guided Recruiter Tour/i });
    fireEvent.click(tourBtn);

    expect(onUnlock).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/Optical ID Verified/i)).not.toBeInTheDocument();
  });

  it('unlocks and focuses PaperViewer when "Read Interactive Resume" card is clicked', () => {
    const openByPathSpy = vi.spyOn(PaperViewerStore, 'openByPathOrName').mockImplementation(() => {});
    const focusOrLaunchSpy = vi.spyOn(ApplicationRegistry, 'focusOrLaunch').mockImplementation(() => 'win-paper');
    const onUnlock = vi.fn();

    render(<LockScreen defaultLocked={true} onUnlock={onUnlock} />);

    const resumeBtn = screen.getByRole('button', { name: /Read Interactive Resume/i });
    fireEvent.click(resumeBtn);

    expect(onUnlock).toHaveBeenCalledTimes(1);
    expect(openByPathSpy).toHaveBeenCalledWith('Resume_Prathamraj_Giri.paper');
    expect(focusOrLaunchSpy).toHaveBeenCalledWith('prathamos.paper', expect.any(Object));
  });

  it('unlocks universally on background screen click', () => {
    const onUnlock = vi.fn();
    render(<LockScreen defaultLocked={true} onUnlock={onUnlock} />);

    const overlay = screen.getByLabelText('Lock Screen');
    fireEvent.click(overlay);

    expect(onUnlock).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/Optical ID Verified/i)).not.toBeInTheDocument();
  });

  it('unlocks universally on any keypress (e.g. Enter, Space, Escape)', () => {
    const onUnlock = vi.fn();
    render(<LockScreen defaultLocked={true} onUnlock={onUnlock} />);

    fireEvent.keyDown(window, { key: 'Enter' });

    expect(onUnlock).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/Optical ID Verified/i)).not.toBeInTheDocument();
  });

  it('re-locks when window receives os-lock event', () => {
    const { rerender } = render(<LockScreen defaultLocked={false} />);
    expect(screen.queryByText(/Optical ID Verified/i)).not.toBeInTheDocument();

    fireEvent(window, new Event('os-lock'));

    expect(screen.getByText(/Optical ID Verified/i)).toBeInTheDocument();
  });
});
