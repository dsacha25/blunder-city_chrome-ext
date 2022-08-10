import { ChessGameType } from '../../utils/types/chess/chess-game-type/chess-game-type';
import { ChessMove } from '../../utils/types/chess/chess-move/chess-move';
import { HistoryMove } from '../../utils/types/chess/history-move/history-move';
import { PromotionPieces } from '../../utils/types/chess/promotion-pieces/promotion-pieces';
import {
	CancelPendingMoveAction,
	ClearPromotionPieceTypeAction,
	CloseActiveGameListenerAction,
	CloseActiveGamesListenerAction,
	GameErrorAction,
	MakeConfirmedMoveStartAction,
	MakeConfirmedMoveSuccessAction,
	MakePendingMoveAction,
	MovePieceAction,
	OpenActiveGameListenerAction,
	OpenActiveGamesListenerAction,
	SetActiveGameAction,
	SetActiveGamesAction,
	SetFenAction,
	SetPromotionPieceTypeAction,
} from './game.action-types';
import GameTypes from './game.types';

/**
 * ALL ACTIVE GAMES
 */
export const openActiveGamesListener = (): OpenActiveGamesListenerAction => ({
	type: GameTypes.OPEN_ACTIVE_GAMES_LISTENER,
});

export const setActiveGames = (
	chessGames: ChessGameType[]
): SetActiveGamesAction => ({
	type: GameTypes.SET_ACTIVE_GAMES_SUCCESS,
	payload: chessGames,
});

export const closeActiveGamesListener = (): CloseActiveGamesListenerAction => ({
	type: GameTypes.CLOSE_ACTIVE_GAMES_LISTENER,
});

/**
 * CURRENT GAME
 */
export const openActiveGameListener = (): OpenActiveGameListenerAction => ({
	type: GameTypes.OPEN_ACTIVE_GAME_LISTENER,
});

export const setActiveGame = (
	chessGame: ChessGameType
): SetActiveGameAction => ({
	type: GameTypes.SET_ACTIVE_GAME_SUCCESS,
	payload: chessGame,
});

export const closeActiveGameListener = (): CloseActiveGameListenerAction => ({
	type: GameTypes.CLOSE_ACTIVE_GAME_LISTENER,
});

/**
 * GAME PLAY
 */
export const movePiece = (move: HistoryMove): MovePieceAction => ({
	type: GameTypes.MOVE_PIECE,
	payload: move,
});

export const setFen = (fen: string): SetFenAction => ({
	type: GameTypes.SET_FEN,
	payload: fen,
});

export const makePendingMove = (move: ChessMove): MakePendingMoveAction => ({
	type: GameTypes.MAKE_PENDING_MOVE,
	payload: move,
});

export const cancelPendingMove = (): CancelPendingMoveAction => ({
	type: GameTypes.CANCEL_PENDING_MOVE,
});

export const makeConfirmedMoveStart = (): MakeConfirmedMoveStartAction => ({
	type: GameTypes.MAKE_CONFIRMED_MOVE_START,
});

export const makeConfirmedMoveSuccess = (): MakeConfirmedMoveSuccessAction => ({
	type: GameTypes.MAKE_CONFIRMED_MOVE_SUCCESS,
});

export const setPromotionPieceType = (
	promotionType: PromotionPieces
): SetPromotionPieceTypeAction => ({
	type: GameTypes.SET_PROMOTION_PIECE_TYPE,
	payload: promotionType,
});

export const clearPromotionPieceType = (): ClearPromotionPieceTypeAction => ({
	type: GameTypes.CLEAR_PROMOTION_PIECE_TYPE,
});

/**
 * GAME ERROR
 */
export const gameError = (error: Error): GameErrorAction => ({
	type: GameTypes.GAME_ERROR,
	payload: error,
});
