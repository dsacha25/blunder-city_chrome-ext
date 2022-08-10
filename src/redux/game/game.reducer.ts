import produce from 'immer';
import getPreviousMove from '../../utils/helpers/strings/get-previous-move/get-previous-move';
import { ChessGameType } from '../../utils/types/chess/chess-game-type/chess-game-type';
import { ChessMove } from '../../utils/types/chess/chess-move/chess-move';
import { GameSummary } from '../../utils/types/chess/game-summary/game-summary';
import Orientation from '../../utils/types/chess/orientation/orientation';
import { PromotionPieces } from '../../utils/types/chess/promotion-pieces/promotion-pieces';
import GameActions from './game.action-types';
import GameTypes from './game.types';

// const DEFAULT_POSITION =
// 	'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export interface GameState {
	orientation: Orientation;
	games: ChessGameType[];
	activeGame: ChessGameType | null;
	gameSummaries: GameSummary[];
	pendingMove: ChessMove | null;
	promotionPieceType: PromotionPieces | null;
	loading: boolean;
	error: string;
}

const INITIAL_STATE: GameState = {
	orientation: 'white',
	games: [],
	activeGame: null,
	gameSummaries: [],
	pendingMove: null,
	promotionPieceType: null,
	loading: false,
	error: '',
};

const gameReducer = produce(
	(state: GameState = INITIAL_STATE, action: GameActions) => {
		switch (action.type) {
			case GameTypes.SET_ACTIVE_GAMES_SUCCESS:
				state.games = action.payload;
				state.error = '';
				return state;
			case GameTypes.CLOSE_ACTIVE_GAMES_LISTENER:
				state.games = [];
				return state;
			case GameTypes.SET_ACTIVE_GAME_SUCCESS:
				state.activeGame = action.payload;
				state.error = '';
				return state;
			case GameTypes.SET_FEN:
				if (!state.activeGame) return state;
				state.activeGame = { ...state.activeGame, fen: action.payload };
				return state;
			case GameTypes.SET_ORIENTATION:
				state.orientation = action.payload;
				return state;
			case GameTypes.MAKE_PENDING_MOVE:
				state.pendingMove = action.payload;
				state.error = '';
				return state;
			case GameTypes.CANCEL_PENDING_MOVE:
				if (!state.activeGame) return state;
				state.activeGame = {
					...state.activeGame,
					fen: getPreviousMove(state.activeGame?.moves),
				};
				state.pendingMove = null;
				state.error = '';
				return state;
			case GameTypes.MAKE_CONFIRMED_MOVE_START:
				state.loading = true;
				state.error = '';
				return state;
			case GameTypes.OPEN_ACTIVE_GAME_LISTENER:
			case GameTypes.MAKE_CONFIRMED_MOVE_SUCCESS:
				state.pendingMove = null;
				state.loading = false;
				state.error = '';
				return state;
			case GameTypes.SET_PROMOTION_PIECE_TYPE:
				state.promotionPieceType = action.payload;
				state.error = '';
				return state;
			case GameTypes.CLEAR_PROMOTION_PIECE_TYPE:
				state.promotionPieceType = null;
				state.error = '';
				return state;
			case GameTypes.CLOSE_ACTIVE_GAME_LISTENER:
				state.activeGame = null;
				state.pendingMove = null;
				state.promotionPieceType = null;
				state.error = '';
				return state;
			case GameTypes.GAME_ERROR:
				state.error = action.payload.message;
				return state;
			default:
				return state;
		}
	},
	INITIAL_STATE
);

export default gameReducer;
