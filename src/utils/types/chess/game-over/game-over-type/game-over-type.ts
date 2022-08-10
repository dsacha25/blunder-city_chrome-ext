import Orientation from '../../orientation/orientation';
import GameOverTypes from '../game-over-types.ts/game-over-types';

type GameOverType = {
	isGameOver: boolean;
	winner: Orientation | null;
	winnerUID?: string;
	type?: GameOverTypes | null;
};

export default GameOverType;
