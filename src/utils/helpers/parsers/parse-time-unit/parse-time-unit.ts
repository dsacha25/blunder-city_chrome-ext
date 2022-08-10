import { ChessGameType } from '../../../types/chess/chess-game-type/chess-game-type';

const parseTimeUnit = (game: ChessGameType): number => {
	switch (game.gameMode) {
		case 'five_by_five':
		case 'five_minute':
			return 300000;
		case 'ten_minute':
		case 'ten_by_fifteen':
			return 600000;
		case 'one_day':
			return 86400000;
		case 'three_day':
			return 259200000;
		case 'untimed':
		default:
			return 0;
	}
};

export default parseTimeUnit;
