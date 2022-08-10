import { ChessGameType } from '../../utils/types/chess/chess-game-type/chess-game-type';
import { ChessMove } from '../../utils/types/chess/chess-move/chess-move';
import { HistoryMove } from '../../utils/types/chess/history-move/history-move';
import Orientation from '../../utils/types/chess/orientation/orientation';
import { PromotionPieces } from '../../utils/types/chess/promotion-pieces/promotion-pieces';
import GameTypes from './game.types';

/**
 * ALL ACTIVE GAMES
 */
export interface OpenActiveGamesListenerAction {
	type: GameTypes.OPEN_ACTIVE_GAMES_LISTENER;
}

export interface SetActiveGamesAction {
	type: GameTypes.SET_ACTIVE_GAMES_SUCCESS;
	payload: ChessGameType[];
}

export interface CloseActiveGamesListenerAction {
	type: GameTypes.CLOSE_ACTIVE_GAMES_LISTENER;
}

/**
 * CURRENT GAME
 */
export interface OpenActiveGameListenerAction {
	type: GameTypes.OPEN_ACTIVE_GAME_LISTENER;
}

export interface SetActiveGameAction {
	type: GameTypes.SET_ACTIVE_GAME_SUCCESS;
	payload: ChessGameType;
}

export interface CloseActiveGameListenerAction {
	type: GameTypes.CLOSE_ACTIVE_GAME_LISTENER;
}

export interface SetOrientationAction {
	type: GameTypes.SET_ORIENTATION;
	payload: Orientation;
}

/**
 * GAME PLAY
 */
export interface MovePieceAction {
	type: GameTypes.MOVE_PIECE;
	payload: HistoryMove;
}

export interface SetFenAction {
	type: GameTypes.SET_FEN;
	payload: string;
}

export interface MakePendingMoveAction {
	type: GameTypes.MAKE_PENDING_MOVE;
	payload: ChessMove;
}

export interface CancelPendingMoveAction {
	type: GameTypes.CANCEL_PENDING_MOVE;
}

export interface MakeConfirmedMoveStartAction {
	type: GameTypes.MAKE_CONFIRMED_MOVE_START;
}

export interface MakeConfirmedMoveSuccessAction {
	type: GameTypes.MAKE_CONFIRMED_MOVE_SUCCESS;
}

export interface SetPromotionPieceTypeAction {
	type: GameTypes.SET_PROMOTION_PIECE_TYPE;
	payload: PromotionPieces;
}

export interface ClearPromotionPieceTypeAction {
	type: GameTypes.CLEAR_PROMOTION_PIECE_TYPE;
}

/**
 * GAME ERROR
 */
export interface GameErrorAction {
	type: GameTypes.GAME_ERROR;
	payload: Error;
}

type GameActions =
	| OpenActiveGamesListenerAction
	| SetActiveGamesAction
	| CloseActiveGamesListenerAction
	| OpenActiveGameListenerAction
	| SetActiveGameAction
	| CloseActiveGameListenerAction
	| SetOrientationAction
	| MovePieceAction
	| SetFenAction
	| MakePendingMoveAction
	| CancelPendingMoveAction
	| MakeConfirmedMoveStartAction
	| MakeConfirmedMoveSuccessAction
	| SetPromotionPieceTypeAction
	| ClearPromotionPieceTypeAction
	| GameErrorAction;

export default GameActions;
