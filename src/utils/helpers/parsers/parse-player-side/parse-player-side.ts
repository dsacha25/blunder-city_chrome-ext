import { ChessGameType } from '../../../types/chess/chess-game-type/chess-game-type';
import Orientation from '../../../types/chess/orientation/orientation';

const parsePlayerSide = (game: ChessGameType, uid?: string): Orientation => {
	if (!uid) return 'white';
	return game.black.uid === uid ? 'black' : 'white';
};

export default parsePlayerSide;
