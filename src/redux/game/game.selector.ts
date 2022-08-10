import { createSelector } from 'reselect';
import { RootState } from '../root-reducer';
import { chunk } from 'lodash';

const selectGame = (state: RootState) => state.game;

/**
 * ALL ACTIVE GAMES
 */
export const selectActiveGames = createSelector(
	selectGame,
	(game) => game.games
);

export const selectGameSummaries = createSelector(
	selectGame,
	(game) => game.gameSummaries
);

/**
 * CURRENT GAME
 */
export const selectActiveGame = createSelector(
	selectGame,
	(game) => game.activeGame
);

export const selectPendingMove = createSelector(
	selectGame,
	(game) => game.pendingMove
);

export const selectPromotionPieceType = createSelector(
	selectGame,
	(game) => game.promotionPieceType
);

export const selectOrientation = createSelector(
	selectGame,
	(game) => game.orientation
);

export const selectGameTurn = createSelector(
	selectActiveGame,
	(activeGame) => activeGame?.turn
);

export const selectTurns = createSelector(selectActiveGame, (game) =>
	chunk(game?.moves, 2)
);

export const selectFen = createSelector(
	selectActiveGame,
	(activeGame) => activeGame?.fen
);

export const selectGameWinner = createSelector(
	selectActiveGame,
	(activeGame) => activeGame?.gameOver.winner
);

export const selectIsGameOver = createSelector(
	selectActiveGame,
	(activeGame) => activeGame?.gameOver.isGameOver
);

export const selectGameOverState = createSelector(
	selectActiveGame,
	(activeGame) => activeGame?.gameOver
);

export const selectGameLoadingState = createSelector(
	selectGame,
	(game) => game.loading
);

/**
 * GAME ERROR
 */
export const selectGameError = createSelector(selectGame, (game) => game.error);
