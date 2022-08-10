import GameOverTypes from '../../../types/chess/game-over/game-over-types.ts/game-over-types';

const parseHowGameEnded = (type?: GameOverTypes): string => {
	switch (type) {
		case 'CHECKMATE':
			return 'Checkmate';
		case 'TIMEOUT':
			return 'game timeout';
		case 'ABANDONMENT':
			return 'game abandonment';
		case 'RESIGNATION':
			return 'player resignation';
		case 'DRAW_AGREEMENT':
			return 'Draw by agreement';
		case 'DRAW_50_MOVE':
			return '50 move rule reached, game drawn';
		case 'DRAW_INSUFFICIENT_MATERIAL':
			return 'Draw due to insufficient material';
		case 'DRAW_STALEMATE':
			return 'Draw by stalemate';
		case 'DRAW_REPETITION':
			return 'Draw by threefold repetition';
		default:
			return 'Game Over';
	}
};

export default parseHowGameEnded;
