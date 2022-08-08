import UserActions from './user.action-types';
import UserTypes from './user.types';
import { produce } from 'immer';
import { ChessUser } from '../../utils/types/user/chess-user/chess-user';
import { User } from 'firebase/auth';
import { NewCredentials } from '../../utils/types/user/new-credentials/new-credentials';

export interface UserState {
	auth: User | null;
	user: ChessUser | null;
	newCredentials: NewCredentials | null;
	enemyRequests: any[];
	online: boolean;
	loading: boolean;
	error: string;
}

export const INITIAL_STATE = {
	auth: null,
	user: null,
	newCredentials: null,
	enemyRequests: [],
	online: false,
	loading: false,
	error: '',
};

const userReducer = produce(
	(state: UserState = INITIAL_STATE, action: UserActions) => {
		switch (action.type) {
			case UserTypes.LOG_IN_SUCCESS:
				state.auth = action.payload;
				state.error = '';
				return state;
			case UserTypes.USER_ERROR:
				state.error = action.payload.message;
				return state;
			default:
				return state;
		}
	},
	INITIAL_STATE
);

export default userReducer;
