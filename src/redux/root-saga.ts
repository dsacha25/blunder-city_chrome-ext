import { all, call } from 'typed-redux-saga/macro';
import { gameSagas } from './game/game.sagas';
import { userSagas } from './users/user.sagas';

function* rootSaga() {
	yield* all([call(userSagas), call(gameSagas)]);
}

export default rootSaga;
