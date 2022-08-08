import { User } from 'firebase/auth';
// import { ChessUser } from '../../utils/types/user/chess-user/chess-user';
import { Credentials } from '../../utils/types/user/credentials/credentials';
import {
	LogInStartAction,
	LogInSuccessAction,
	UserErrorAction,
} from './user.action-types';
import UserTypes from './user.types';

/**
 * SIGN IN
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
 * USER ERROR
 */
export const userError = (error: Error): UserErrorAction => ({
	type: UserTypes.USER_ERROR,
	payload: error,
});
