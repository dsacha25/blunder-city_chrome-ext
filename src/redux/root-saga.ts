import { all, call } from 'typed-redux-saga/macro';
import { userSagas } from './user/user.sagas';

function* rootSaga() {
	yield* all([call(userSagas)]);
}

export default rootSaga;
