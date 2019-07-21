import { combineReducers } from 'redux';
import loto, { defaultState } from './loto';

const app = combineReducers({
    loto
});

export const DEFAULT_STATE = {
  loto: defaultState
};

export default app;
