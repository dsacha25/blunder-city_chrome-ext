import { Move } from 'chess.js';
import GameOverType from '../game-over/game-over-type/game-over-type';
import GameTime from '../game-time/game-time';

export interface ConfirmedMove {
	fen: string;
	move: Move | string;
	id: string;
	gameOver: GameOverType;
	gameTime?: GameTime;
}
