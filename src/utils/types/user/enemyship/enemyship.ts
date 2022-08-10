import { Timestamp } from 'firebase/firestore';

export interface Enemyship {
	users: [string, string];
	createdAt: Timestamp;
}
