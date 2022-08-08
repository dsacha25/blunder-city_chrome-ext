import { User } from 'firebase/auth';
import { ChessUser } from '../../utils/types/user/chess-user/chess-user';
// import { ChessUser } from '../../utils/types/user/chess-user/chess-user';
import { Credentials } from '../../utils/types/user/credentials/credentials';
import {
	CloseChessUserListenerAction,
	FetchChessUserSuccessAction,
	LogInStartAction,
	LogInSuccessAction,
	LogOutStartAction,
	LogOutSuccessAction,
	OpenChessUserListenerAction,
	UserErrorAction,
} from './user.action-types';
import UserTypes from './user.types';

/**
 * CHESS USER LISTENER
 */
export const openChessUserListener = (): OpenChessUserListenerAction => ({
	type: UserTypes.OPEN_CHESS_USER_LISTENER,
});

export const closeChessUserListener = (): CloseChessUserListenerAction => ({
	type: UserTypes.CLOSE_CHESS_USER_LISTENER,
});

export const fetchChessUserSuccess = (
	chessUser: ChessUser
): FetchChessUserSuccessAction => ({
	type: UserTypes.FETCH_CHESS_USER_SUCCESS,
	payload: chessUser,
});

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
