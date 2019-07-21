// action types
export const SEND_RESULT = 'SEND_RESULT';
export const SEND_RESULT_SUCCESS = 'SEND_RESULT_SUCCESS';
export const RESULT_FAILURE = 'RESULT_FAILURE';

// action creators
export function sendResult(result) {
  return { type: SEND_RESULT, result };
}
export function sendResultSuccess(result) {
  return { type: SEND_RESULT_SUCCESS, result };
}

export function resultFailure(error) {
  return { type: RESULT_FAILURE, error };
}