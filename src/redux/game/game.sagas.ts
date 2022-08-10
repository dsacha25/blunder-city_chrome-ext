import { where } from 'firebase/firestore';
import { EventChannel } from 'redux-saga';
import { all, call, put, takeEvery, select } from 'typed-redux-saga/macro';
import { listener } from '../../utils/classes/sagas/saga-listener';
import getReturn from '../../utils/helpers/sagas/get-return-type';
import { ChessGameType } from '../../utils/types/chess/chess-game-type/chess-game-type';
import { selectUserUID } from '../users/user.selector';
import { gameError, setActiveGames } from './game.actions';
import GameTypes from './game.types';

export function* setActiveGamesSaga(chessGames: ChessGameType[]) {
	yield console.log('CHESS GAMES: ', chessGames);
	yield* put(setActiveGames(chessGames));
}

export function* createActiveGamesListener() {
	try {
		const uid = yield* select(selectUserUID);
		if (!uid) return;

		const gamesChannel = yield* call<
			any[],
			getReturn<EventChannel<ChessGameType[]>>
		>(
			listener.generateCollectionListener,
			'games',
			where('users', 'array-contains', uid),
			where('gameOver.isGameOver', '==', false)
		);

		yield* listener.onListenerClose(
			gamesChannel,
			GameTypes.CLOSE_ACTIVE_GAMES_LISTENER
		);

		yield listener.initializeChannel(gamesChannel, setActiveGamesSaga);
	} catch (err) {
		yield put(gameError(err as Error));
	}
}

export function* onOpenActiveGamesListener() {
	yield takeEvery(
		GameTypes.OPEN_ACTIVE_GAMES_LISTENER,
		createActiveGamesListener
	);
}

export function* gameSagas() {
	yield all([call(onOpenActiveGamesListener)]);
}
