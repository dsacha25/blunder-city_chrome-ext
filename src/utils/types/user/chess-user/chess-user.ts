import { UserInfo } from 'firebase/auth';

export interface ChessUser extends UserInfo {
	readonly rating?: number;
	readonly totalOppRatings: number;
	readonly wins: number;
	readonly draws: number;
	readonly losses: number;
	readonly online: boolean;
}
