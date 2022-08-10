import { where } from 'firebase/firestore';
import { EventChannel } from 'redux-saga';
import { all, call, put, takeEvery, select } from 'typed-redux-saga/macro';
import { functions } from '../../utils/classes/firestore/firestore-app';
import { listener } from '../../utils/classes/sagas/saga-listener';
import { getPlayerOrientation } from '../../utils/helpers/game/get-player-orientation/get-player-orientation';
import parseGameTime from '../../utils/helpers/parsers/parse-game-time/parse-game-time';
import parsePlayableGames from '../../utils/helpers/parsers/parse-playable-games/parse-playable-games';
import getReturn from '../../utils/helpers/sagas/get-return-type';
import { ChessGameType } from '../../utils/types/chess/chess-game-type/chess-game-type';
import { ConfirmedMove } from '../../utils/types/chess/confirmed-move/confirmed-move';
import { selectUserUID } from '../users/user.selector';
import {
	gameError,
	makeConfirmedMoveSuccess,
	setActiveGame,
	setActiveGames,
	setPlayerOrientation,
} from './game.actions';
import { selectActiveGame, selectPendingMove } from './game.selector';
import GameTypes from './game.types';

/**
 * MAKE MOVE
 */
export function* makeConfirmedMoveSaga() {
	try {
		const game = yield* select(selectActiveGame);
		const pendingMove = yield* select(selectPendingMove);
		const uid = yield* select(selectUserUID);

		if (!game || !pendingMove || !uid) return;

		const { fen, move, gameOver } = pendingMove;

		const confirmedMove: ConfirmedMove = {
			fen,
			id: game.id,
			move,
			gameOver,
			gameTime: parseGameTime(uid, game),
		};

		yield* call(
			functions.callFirebaseFunction,
			'makeConfirmedMove',
			confirmedMove
		);
		yield* put(makeConfirmedMoveSuccess());
	} catch (err) {
		yield* put(gameError(err as Error));
	}
}

export function* onMakeConfirmedMoveStart() {
	yield* takeEvery(GameTypes.MAKE_CONFIRMED_MOVE_START, makeConfirmedMoveSaga);
}

/**
 * CURRENT GAME
 */
export function* setActiveGameSaga(game: ChessGameType) {
	yield* put(setActiveGame(game));
	const uid = yield* select(selectUserUID);

	if (!uid) return;
	yield* put(setPlayerOrientation(getPlayerOrientation(game.white.uid, uid)));
}

export function* createActiveGameListener() {
	try {
		const game = yield* select(selectActiveGame);
		if (!game) return;

		const gameChannel = yield* call<
			any[],
			getReturn<EventChannel<ChessGameType>>
		>(listener.generateDocListener, `games/${game.id}`, true);

		yield* listener.onListenerClose(
			gameChannel,
			GameTypes.CLOSE_ACTIVE_GAME_LISTENER
		);

		yield listener.initializeChannel(gameChannel, setActiveGameSaga);
	} catch (err) {
		yield* put(gameError(err as Error));
	}
}

export function* onOpenActiveGameListener() {
	yield* takeEvery(
		GameTypes.OPEN_ACTIVE_GAME_LISTENER,
		createActiveGameListener
	);
}

/**
 * ACTIVE GAMES LISTENER
 */
export function* setActiveGamesSaga(chessGames: ChessGameType[]) {
	yield console.log('CHESS GAMES: ', chessGames);
	yield* put(setActiveGames(chessGames));
	const uid = yield* select(selectUserUID);

	const playableGames = parsePlayableGames(chessGames, uid);

	if (process.env.NODE_ENV === 'development') return;

	if (playableGames.length > 0) {
		chrome.browserAction.setBadgeText({
			text: playableGames.length.toString(),
		});
		chrome.browserAction.setBadgeBackgroundColor({ color: '#c8354f' });
	} else if (playableGames.length === 0) {
		chrome.browserAction.setBadgeText({});
	}
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
		yield* put(gameError(err as Error));
	}
}

export function* onOpenActiveGamesListener() {
	yield* takeEvery(
		GameTypes.OPEN_ACTIVE_GAMES_LISTENER,
		createActiveGamesListener
	);
}

export function* gameSagas() {
	yield* all([
		call(onOpenActiveGamesListener),
		call(onOpenActiveGameListener),
		call(onMakeConfirmedMoveStart),
	]);
}
