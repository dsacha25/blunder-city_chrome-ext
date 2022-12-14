enum GameTypes {
	OPEN_ACTIVE_GAMES_LISTENER = 'OPEN_ACTIVE_GAMES_LISTENER',
	CLOSE_ACTIVE_GAMES_LISTENER = 'CLOSE_ACTIVE_GAMES_LISTENER',
	SET_ACTIVE_GAMES_SUCCESS = 'SET_ACTIVE_GAMES_SUCCESS',
	OPEN_ACTIVE_GAME_LISTENER = 'OPEN_ACTIVE_GAME_LISTENER',
	CLOSE_ACTIVE_GAME_LISTENER = 'CLOSE_ACTIVE_GAME_LISTENER',
	SET_ACTIVE_GAME_SUCCESS = 'SET_ACTIVE_GAME_SUCCESS',
	MOVE_PIECE = 'MOVE_PIECE',
	MAKE_PENDING_MOVE = 'MAKE_PENDING_MOVE',
	CANCEL_PENDING_MOVE = 'CANCEL_PENDING_MOVE',
	MAKE_CONFIRMED_MOVE_START = 'MAKE_CONFIRMED_MOVE_START',
	MAKE_CONFIRMED_MOVE_SUCCESS = 'MAKE_CONFIRMED_MOVE_SUCCESS',
	SET_PROMOTION_PIECE_TYPE = 'SET_PROMOTION_PIECE_TYPE',
	CLEAR_PROMOTION_PIECE_TYPE = 'CLEAR_PROMOTION_PIECE_TYPE',
	SET_FEN = 'SET_FEN',
	SET_ORIENTATION = 'SET_ORIENATION',
	GAME_ERROR = 'GAME_ERROR',
}

export default GameTypes;
