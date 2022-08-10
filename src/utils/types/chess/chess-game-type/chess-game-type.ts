import { Enemyship } from '../../user/enemyship/enemyship';
import GameModeTypes from '../game-mode-type/game-mode-type';
import { HistoryMove } from '../history-move/history-move';
import Orientation from '../orientation/orientation';
import { Player } from '../../user/player/player';
import GameOverType from '../game-over/game-over-type/game-over-type';

export interface ChessGameType extends Enemyship {
	id: string;
	gameOver: GameOverType;
	gameMode: GameModeTypes;
	moves: HistoryMove[];
	turn: Orientation;
	black: Player;
	white: Player;
	blackPresent: boolean;
	whitePresent: boolean;
	latestMove: string;
	fen: string;
}
