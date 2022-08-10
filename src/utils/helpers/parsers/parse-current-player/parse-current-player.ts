import { ChessGameType } from '../../../types/chess/chess-game-type/chess-game-type';
import { Player } from '../../../types/user/player/player';

const parseCurrentPlayer = (
	uid: string,
	game: ChessGameType,
	inverse?: boolean
): Player => {
	return !inverse
		? game.black.uid === uid
			? game.black
			: game.white
		: game.black.uid === uid
		? game.white
		: game.black;
};

export default parseCurrentPlayer;
