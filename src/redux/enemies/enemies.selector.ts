import { createSelector } from 'reselect';
import { RootState } from '../root-reducer';

const selectEnemy = (state: RootState) => state.enemy;

export const selectEnemyInfo = createSelector(
	selectEnemy,
	(enemy) => enemy.opponentInfo
);

export const selectEnemyError = createSelector(
	selectEnemy,
	(enemy) => enemy.error
);
