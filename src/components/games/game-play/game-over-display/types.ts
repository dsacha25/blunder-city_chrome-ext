import GameOverType from '../../../../utils/types/chess/game-over/game-over-type/game-over-type';
import Orientation from '../../../../utils/types/chess/orientation/orientation';

export interface GameOverDisplayProps {
	winner: Orientation | null;
}
