import { ActionTypes, SystemStateTypes } from './systemTypes';
import { changeLangAction } from './systemActions';
import { Reducer } from 'redux';

const defaultState = ({ lang: 'fa' } as unknown) as SystemState;

export const reducer: Reducer<SystemState> = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.BOOT:
      return {
        ...state,
        boot: true
      };
    case SystemStateTypes.CHANGE_LANG:
      return {
        ...state,
        lang: payload
      };
    default:
      return state;
  }
};

export function boot() {
  return {
    type: ActionTypes.BOOT
  };
}

export function session() {
  return async (dispatch, getState) => {
    dispatch(boot());
  };
}

export function changeLang(lang) {
  return (dispatch, getState) => {
    dispatch(changeLangAction(lang));
  };
}
export interface SystemState {
  boot: boolean;
  reHydrated: boolean;
  changeLangAction: string;
}
