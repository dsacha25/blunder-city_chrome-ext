import { Timestamp } from 'firebase/firestore';
import GameModeTypes from '../game-mode-type/game-mode-type';
import GameOverType from '../game-over/game-over-type/game-over-type';

type PlayerStats = {
	uid: string;
	rating: number;
};

export interface GameSummary {
	id: string;
	black: PlayerStats;
	white: PlayerStats;
	createdAt: Timestamp;
	gameMode: GameModeTypes;
	gameOver: GameOverType;
	users: [string, string];
}
