import { combineReducers } from 'redux';
import { reducer as system, SystemState } from './system/systemReducer';

export const reducer = combineReducers<RootState>({
  system
});

// tslint:disable-next-line:interface-name
export interface RootState {
  system: SystemState;
}
