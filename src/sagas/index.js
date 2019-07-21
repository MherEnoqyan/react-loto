import { call, put, takeLatest } from 'redux-saga/effects';
import {SEND_RESULT, sendResultSuccess, resultFailure} from '../actions/loto';


function* sendResult (action) {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(action.result),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };

    const res = yield call(fetch, 'finch-test', options);
    const loto = yield res.json();
    yield put(sendResultSuccess(loto));
  } catch (e) {
    yield put(resultFailure(e.message));
  }
}

function* rootSaga() {
  yield takeLatest(SEND_RESULT, sendResult);
}

export default rootSaga;
