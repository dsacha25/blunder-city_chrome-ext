import { Move } from 'chess.js';
import GameOverType from '../game-over/game-over-type/game-over-type';

export interface ChessMove {
	fen: string;
	move: Move | string;
	gameOver: GameOverType;
}
