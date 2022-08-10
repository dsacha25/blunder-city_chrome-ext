import { ChessUser } from '../../utils/types/user/chess-user/chess-user';
import EnemyTypes from './enemies.types';

/**
 * OPPONENT LISTENER
 */
export interface OpenOpponentInfoListenerAction {
	type: EnemyTypes.OPEN_OPPONENT_INFO_LISTENER;
	payload: string;
}

export interface CloseOpponentInfoListenerAction {
	type: EnemyTypes.CLOSE_OPPONENT_INFO_LISTENER;
}

export interface GetOpponentInfoSuccessAction {
	type: EnemyTypes.GET_OPPONENT_INFO_SUCCESS;
	payload: ChessUser;
}

/**
 * GAME ERROR
 */
export interface EnemyErrorAction {
	type: EnemyTypes.ENEMY_ERROR;
	payload: Error;
}

type EnemyActions =
	| OpenOpponentInfoListenerAction
	| CloseOpponentInfoListenerAction
	| GetOpponentInfoSuccessAction
	| EnemyErrorAction;

export default EnemyActions;
