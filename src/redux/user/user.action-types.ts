import { User } from 'firebase/auth';
import { ChessUser } from '../../utils/types/user/chess-user/chess-user';
import { Credentials } from '../../utils/types/user/credentials/credentials';
import UserTypes from './user.types';

export interface LogInStartAction {
	type: UserTypes.LOG_IN_START;
	payload: Credentials;
}

export interface LogInSuccessAction {
	type: UserTypes.LOG_IN_SUCCESS;
	payload: User;
}

export interface UserErrorAction {
	type: UserTypes.USER_ERROR;
	payload: Error;
}

type UserActions = LogInStartAction | LogInSuccessAction | UserErrorAction;

export default UserActions;
