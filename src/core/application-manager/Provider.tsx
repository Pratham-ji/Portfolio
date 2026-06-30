import { useReducer, ReactNode, useMemo, useCallback } from 'react';
import { ApplicationContext, ApplicationContextValue } from './Context';
import { applicationReducer } from './reducer';
import { ApplicationState, AppManifest } from './types';

import { TerminalManifest } from '../../apps/terminal';
import { ExplorerManifest } from '../../apps/explorer';
import { ProjectsManifest } from '../../apps/projects';
import { GithubManifest } from '../../apps/github';
import { LeetcodeManifest } from '../../apps/leetcode';
import { SkillsManifest } from '../../apps/skills';
import { ExperienceManifest } from '../../apps/experience';
import { ResumeManifest } from '../../apps/resume';
import { ContactManifest } from '../../apps/contact';
import { AboutManifest } from '../../apps/about';
import { AchievementsManifest } from '../../apps/achievements';
import { ResearchManifest } from '../../apps/research';
import { SettingsManifest } from '../../apps/settings';

// Pre-load essential system apps metadata (NO UI COMPONENTS)
const defaultRegistry: Record<string, AppManifest> = {
  [TerminalManifest.id]: TerminalManifest,
  [ExplorerManifest.id]: ExplorerManifest,
  [ProjectsManifest.id]: ProjectsManifest,
  [GithubManifest.id]: GithubManifest,
  [LeetcodeManifest.id]: LeetcodeManifest,
  [SkillsManifest.id]: SkillsManifest,
  [ExperienceManifest.id]: ExperienceManifest,
  [ResumeManifest.id]: ResumeManifest,
  [ContactManifest.id]: ContactManifest,
  [AboutManifest.id]: AboutManifest,
  [AchievementsManifest.id]: AchievementsManifest,
  [ResearchManifest.id]: ResearchManifest,
  [SettingsManifest.id]: SettingsManifest,
};

/**
 * Provider for the OS Application Registry.
 * Manages pure metadata. Does NOT bundle UI code.
 * @param children - React children components
 */
export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const initialState: ApplicationState = { registry: defaultRegistry };
  const [state, dispatch] = useReducer(applicationReducer, initialState);

  const getAppManifest = useCallback((id: string) => {
    return state.registry[id];
  }, [state.registry]);

  const getAllApps = useCallback(() => {
    return Object.values(state.registry);
  }, [state.registry]);

  const value: ApplicationContextValue = useMemo(() => ({
    state,
    dispatch,
    getAppManifest,
    getAllApps
  }), [state, getAppManifest, getAllApps]);

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};
