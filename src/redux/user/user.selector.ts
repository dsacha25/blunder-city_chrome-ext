import { createSelector } from 'reselect';
import { RootState } from '../root-reducer';

const selectUser = (state: RootState) => state.user;

/**
 * CHESS USER
 */
export const selectChessUser = createSelector(selectUser, (user) => user.user);

/**
 * CREDENTIALS
 */
export const selectUserCredentials = createSelector(
	selectUser,
	(user) => user.newCredentials
);

/**
 * USER AUTH
 */
export const selectUserUID = createSelector(
	selectUser,
	(user) => user.auth?.uid
);
