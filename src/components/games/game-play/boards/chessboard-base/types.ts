import { Square } from 'chess.js';
import Orientation from '../../../../../utils/types/chess/orientation/orientation';

export interface ChessboardBaseProps {
	fen: string | undefined;
	orientation: Orientation;
	playersTurn: boolean;
	makeMove: (from: Square, to: Square) => void;
}
