import { ChessGameType } from '../../../types/chess/chess-game-type/chess-game-type';

const getOpponentName = (uid: string, game: ChessGameType): string => {
	return game.black.uid !== uid
		? game.black.displayName
		: game.white.displayName;
};

export default getOpponentName;
