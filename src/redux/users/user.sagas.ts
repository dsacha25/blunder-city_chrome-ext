import { DocumentReference } from 'firebase/firestore';
import { EventChannel } from 'redux-saga';
import {
	all,
	call,
	put,
	select,
	takeEvery,
	takeLatest,
} from 'typed-redux-saga/macro';
import { auth, db } from '../../utils/classes/firestore/firestore-app';
import { listener } from '../../utils/classes/sagas/saga-listener';
import getReturn from '../../utils/helpers/sagas/get-return-type';
import { ChessUser } from '../../utils/types/user/chess-user/chess-user';
import { LogInStartAction } from './user.action-types';
import {
	closeChessUserListener,
	fetchChessUserSuccess,
	logInUserSuccess,
	logOutUserSuccess,
	openChessUserListener,
	userError,
} from './user.actions';
import { selectUserUID } from './user.selector';
import UserTypes from './user.types';

/**
 * CHESS USER LISTENER
 */

export function* setChessUser(chessUser: ChessUser) {
	yield* put(fetchChessUserSuccess(chessUser));
}

export function* initializeChessUserListener() {
	try {
		const uid = yield* select(selectUserUID);
		if (!uid) return;

		/**
		 * CREATE LISTENER CHANNEL
		 */
		const chessUserChannel = yield* call<
			string[],
			getReturn<EventChannel<ChessUser>>
		>(listener.generateDocListener, `users/${uid}`);

		/**
		 * CLOSE LISTENER
		 */
		yield* listener.onListenerClose(
			chessUserChannel,
			UserTypes.CLOSE_CHESS_USER_LISTENER
		);

		/**
		 * INITIALIZE CHANNEL
		 */
		yield listener.initializeChannel(chessUserChannel, setChessUser);
	} catch (err) {
		yield* put(userError(err as Error));
	}
}

export function* onOpenChessUserListener() {
	yield* takeEvery(
		UserTypes.OPEN_CHESS_USER_LISTENER,
		initializeChessUserListener
	);
}

/**
 * LOG OUT
 */
export function* logOutUser() {
	yield auth.logOutUser();
	yield* put(closeChessUserListener());
	yield* put(logOutUserSuccess());
}

export function* onLogOutUser() {
	yield* takeLatest(UserTypes.LOG_OUT_START, logOutUser);
}

/**
 * LOG IN
 */
export function* logInUser({ payload: credentials }: LogInStartAction) {
	try {
		console.log('SIGN IN USER: ', credentials);

		const user = yield* call(
			auth.logInUser,
			credentials.email,
			credentials.password
		);

		yield* put(logInUserSuccess(user));
		yield* put(openChessUserListener());
	} catch (err) {
		yield* put(userError(err as Error));
	}
}

export function* onLogInUser() {
	yield* takeEvery(UserTypes.LOG_IN_START, logInUser);
}

/**
 * RUN ALL USER SAGAS
 */
export function* userSagas() {
	yield* all([
		call(onLogInUser),
		call(onLogOutUser),
		call(onOpenChessUserListener),
	]);
}
