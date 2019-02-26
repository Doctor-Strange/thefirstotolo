import { createActions } from '../common';
import { ActionTypes, SystemStateTypes } from './systemTypes';

export const changeLangAction = lang => ({
  payload: lang,
  type: SystemStateTypes.CHANGE_LANG
});

export const SESSION = createActions(ActionTypes.SESSION);
