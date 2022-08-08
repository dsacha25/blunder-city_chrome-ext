import { all, call, put, takeEvery, takeLatest } from 'typed-redux-saga/macro';
import { auth } from '../../utils/classes/firestore/firestore-app';
import { LogInStartAction } from './user.action-types';
import { logInUserSuccess, logOutUserSuccess, userError } from './user.actions';
import UserTypes from './user.types';

/**
 * LOG OUT
 */
export function* logOutUser() {
	yield auth.logOutUser();
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
	yield* all([call(onLogInUser), call(onLogOutUser)]);
}
