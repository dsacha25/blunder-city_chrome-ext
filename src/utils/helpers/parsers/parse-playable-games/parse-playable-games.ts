import { filter } from 'lodash';
import { ChessGameType } from '../../../types/chess/chess-game-type/chess-game-type';
import parsePlayerSide from '../parse-player-side/parse-player-side';

const parsePlayableGames = (
	games: ChessGameType[],
	uid?: string
): ChessGameType[] => {
	return filter(games, (game) => game.turn === parsePlayerSide(game, uid));
};

export default parsePlayableGames;
