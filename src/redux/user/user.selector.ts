import { createSelector } from 'reselect';
import { RootState } from '../root-reducer';

const selectUser = (state: RootState) => state.user;

/**
 * CREDENTIALS
 */
export const selectUserCredentials = createSelector(
	selectUser,
	(user) => user.newCredentials
);
