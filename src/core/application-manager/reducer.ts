import { ApplicationState, ApplicationAction } from './types';

/**
 * Application reducer handling app registration metadata.
 */
export const applicationReducer = (state: ApplicationState, action: ApplicationAction): ApplicationState => {
  switch (action.type) {
    case 'REGISTER_APP':
      return {
        ...state,
        registry: {
          ...state.registry,
          [action.payload.id]: action.payload,
        },
      };
      
    case 'UNREGISTER_APP': {
      const { [action.payload.id]: _removed, ...remaining } = state.registry;
      return { ...state, registry: remaining };
    }
      
    default:
      return state;
  }
};
