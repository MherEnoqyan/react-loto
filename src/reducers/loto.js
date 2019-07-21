import {
  SEND_RESULT,
  SEND_RESULT_SUCCESS,
  RESULT_FAILURE
} from '../actions/loto';

export const defaultState = {
  loading: false,
  result: false,
  error: ''
};

export default function loto(state = defaultState, action) {
  switch (action.type) {
    case SEND_RESULT:
      return {
        ...state,
        loading: true,
        result: false,
        error: ''
      };

    case SEND_RESULT_SUCCESS:
      return {
        ...state,
        loading: false,
        result: true
      };

    case RESULT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
}
