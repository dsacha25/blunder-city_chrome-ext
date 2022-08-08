import { User } from 'firebase/auth';
// import { ChessUser } from '../../utils/types/user/chess-user/chess-user';
import { Credentials } from '../../utils/types/user/credentials/credentials';
import UserTypes from './user.types';

/**
 * LOG IN
 */
export interface LogInStartAction {
	type: UserTypes.LOG_IN_START;
	payload: Credentials;
}

export interface LogInSuccessAction {
	type: UserTypes.LOG_IN_SUCCESS;
	payload: User;
}

/**
 * LOG OUT
 */
export interface LogOutStartAction {
	type: UserTypes.LOG_OUT_START;
}

export interface LogOutSuccessAction {
	type: UserTypes.LOG_OUT_SUCCESS;
}

/**
 * USER ERROR
 */
export interface UserErrorAction {
	type: UserTypes.USER_ERROR;
	payload: Error;
}

type UserActions =
	| LogInStartAction
	| LogInSuccessAction
	| LogOutStartAction
	| LogOutSuccessAction
	| UserErrorAction;

export default UserActions;
