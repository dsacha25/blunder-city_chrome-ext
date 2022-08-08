import { all, call, put, takeEvery } from 'typed-redux-saga/macro';
import { auth } from '../../utils/classes/firestore/firestore-app';
import { LogInStartAction } from './user.action-types';
import { logInUserSuccess, userError } from './user.actions';
import UserTypes from './user.types';

export function* signInUser({ payload: credentials }: LogInStartAction) {
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

export function* onSignInUser() {
	yield* takeEvery(UserTypes.LOG_IN_START, signInUser);
}

export function* userSagas() {
	yield* all([call(onSignInUser)]);
}
