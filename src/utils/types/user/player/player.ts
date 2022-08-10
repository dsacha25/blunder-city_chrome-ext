import { Timestamp } from 'firebase/firestore';
import GameTime from '../../chess/game-time/game-time';

export interface Player {
	uid: string;
	displayName: string;
	gameTime?: GameTime;
	previousMoveTime?: Timestamp;
	present: boolean;
}
