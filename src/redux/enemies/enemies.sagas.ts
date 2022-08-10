import { EventChannel } from 'redux-saga';
import { all, call, put, takeEvery } from 'typed-redux-saga/macro';
import { listener } from '../../utils/classes/sagas/saga-listener';
import getReturn from '../../utils/helpers/sagas/get-return-type';
import { ChessUser } from '../../utils/types/user/chess-user/chess-user';
import { OpenOpponentInfoListenerAction } from './enemies.action-types';
import { enemyError, getOpponentInfoSuccess } from './enemies.actions';
import EnemyTypes from './enemies.types';

export function* getOpponentInfo(opponent: ChessUser) {
	yield* put(getOpponentInfoSuccess(opponent));
}

export function* openOpponentListenerSaga({
	payload: enemyUID,
}: OpenOpponentInfoListenerAction) {
	try {
		const opponentChannel = yield* call<
			any[],
			getReturn<EventChannel<ChessUser>>
		>(listener.generateDocListener, `users/${enemyUID}`);

		yield* listener.onListenerClose(
			opponentChannel,
			EnemyTypes.CLOSE_OPPONENT_INFO_LISTENER
		);

		yield listener.initializeChannel(opponentChannel, getOpponentInfo);
	} catch (err) {
		yield* put(enemyError(err as Error));
	}
}

export function* onOpenOpponentListener() {
	yield* takeEvery(
		EnemyTypes.OPEN_OPPONENT_INFO_LISTENER,
		openOpponentListenerSaga
	);
}

export function* enemySagas() {
	yield* all([call(onOpenOpponentListener)]);
}
