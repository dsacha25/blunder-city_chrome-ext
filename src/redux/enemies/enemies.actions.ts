import { ChessUser } from '../../utils/types/user/chess-user/chess-user';
import {
	CloseOpponentInfoListenerAction,
	EnemyErrorAction,
	GetOpponentInfoSuccessAction,
	OpenOpponentInfoListenerAction,
} from './enemies.action-types';
import EnemyTypes from './enemies.types';

/**
 * OPPONENT LISTENER
 */
export const openOpponentInfoListener = (
	enemyUID: string
): OpenOpponentInfoListenerAction => ({
	type: EnemyTypes.OPEN_OPPONENT_INFO_LISTENER,
	payload: enemyUID,
});

export const closeOpponentInfoListener =
	(): CloseOpponentInfoListenerAction => ({
		type: EnemyTypes.CLOSE_OPPONENT_INFO_LISTENER,
	});

export const getOpponentInfoSuccess = (
	opponent: ChessUser
): GetOpponentInfoSuccessAction => ({
	type: EnemyTypes.GET_OPPONENT_INFO_SUCCESS,
	payload: opponent,
});

/**
 * GAME ERROR
 */
export const enemyError = (error: Error): EnemyErrorAction => ({
	type: EnemyTypes.ENEMY_ERROR,
	payload: error,
});
