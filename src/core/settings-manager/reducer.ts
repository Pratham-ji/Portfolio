import { SettingsState, SettingsAction } from './types';
import { defaultSettings } from './defaultSettings';

/**
 * Settings reducer handling all state mutations immutably.
 */
export const settingsReducer = (state: SettingsState, action: SettingsAction): SettingsState => {
  switch (action.type) {
    case 'UPDATE_SETTING':
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.payload.key]: action.payload.value,
        },
      };
      
    case 'RESET_SETTINGS':
      return {
        ...state,
        settings: defaultSettings,
      };
      
    default:
      return state;
  }
};
