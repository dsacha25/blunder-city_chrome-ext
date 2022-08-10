import produce from 'immer';
import { ChessUser } from '../../utils/types/user/chess-user/chess-user';
import EnemyActions from './enemies.action-types';
import EnemyTypes from './enemies.types';

export interface EnemyState {
	opponentInfo: ChessUser | null;
	error: string;
}

const INITIAL_STATE: EnemyState = {
	opponentInfo: null,
	error: '',
};

const enemyReducer = produce(
	(state: EnemyState = INITIAL_STATE, action: EnemyActions) => {
		switch (action.type) {
			case EnemyTypes.GET_OPPONENT_INFO_SUCCESS:
				state.opponentInfo = action.payload;
				state.error = '';
				return state;
			case EnemyTypes.CLOSE_OPPONENT_INFO_LISTENER:
				state.opponentInfo = null;
				state.error = '';
				return state;
			case EnemyTypes.ENEMY_ERROR:
				state.error = action.payload.message;
				return state;
			default:
				return state;
		}
	},
	INITIAL_STATE
);

export default enemyReducer;
