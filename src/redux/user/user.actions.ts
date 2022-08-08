import { User } from 'firebase/auth';
// import { ChessUser } from '../../utils/types/user/chess-user/chess-user';
import { Credentials } from '../../utils/types/user/credentials/credentials';
import {
	LogInStartAction,
	LogInSuccessAction,
	LogOutStartAction,
	LogOutSuccessAction,
	UserErrorAction,
} from './user.action-types';
import UserTypes from './user.types';

/**
 * LOG IN
 */
export const logInUserStart = (credentials: Credentials): LogInStartAction => ({
	type: UserTypes.LOG_IN_START,
	payload: credentials,
});

export const logInUserSuccess = (user: User): LogInSuccessAction => ({
	type: UserTypes.LOG_IN_SUCCESS,
	payload: user,
});

/**
 * LOG OUT
 */
export const logOutUserStart = (): LogOutStartAction => ({
	type: UserTypes.LOG_OUT_START,
});

export const logOutUserSuccess = (): LogOutSuccessAction => ({
	type: UserTypes.LOG_OUT_SUCCESS,
});

/**
 * USER ERROR
 */
export const userError = (error: Error): UserErrorAction => ({
	type: UserTypes.USER_ERROR,
	payload: error,
});
