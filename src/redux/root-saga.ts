import { all, call } from 'typed-redux-saga/macro';
import { enemySagas } from './enemies/enemies.sagas';
import { gameSagas } from './game/game.sagas';
import { userSagas } from './users/user.sagas';

function* rootSaga() {
	yield* all([call(userSagas), call(gameSagas), call(enemySagas)]);
}

export default rootSaga;
