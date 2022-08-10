declare module 'js-chess-engine' {
	import Board from '../../../node_modules/js-chess-engine/lib/Board.mjs';
	type WhitePieces = 'P' | 'N' | 'B' | 'R' | 'Q' | 'K';
	type BlackPieces = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

	type Columns = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';

	type Rows = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

	type Position = `${Columns}${Rows}`;

	type Pieces = WhitePieces | BlackPieces;

	type Turn = 'black' | 'white';

	export type AiLevel = 0 | 1 | 2 | 3 | 4;

	export interface ConfigObject {
		turn: Turn;
		pieces: { [key: Position]: Pieces };
		moves: { [key: Position]: Position[] };
		isFinished: boolean;
		check: boolean;
		checkMate: boolean;
		castling: {
			whiteLong: boolean;
			whiteShort: boolean;
			blackLong: boolean;
			blackShort: boolean;
		};
		enPassant: Position | null;
		halfMove: number;
		fullMove: number;
	}

	export type BoardConfig = ConfigObject | string;

	interface BoardMove {
		from: Position;
		to: Position;
		configuration: ConfigObject;
	}

	type History = BoardMove[];

	type Move = { [position in Position]: Position };

	type Moves = { [position in Position | string]: Position[] };

	export class Game {
		public board: Board;

		constructor(configuration?: BoardConfig);

		move(from: Position, to: Position): Move;

		moves(from: Position | null): Moves;

		setPiece(location, piece): void;

		removePiece(location): void;

		aiMove(level: AiLevel): { [key: Position]: Position };

		getHistory(reversed?: boolean): History;

		printToConsole(): void;

		exportJson(): ConfigObject;

		exportFEN(): string;
	}

	export function moves(config: BoardConfig): Moves;

	export function status(config: BoardConfig): ConfigObject;

	export function getFen(config: BoardConfig): string;

	export function move(
		config: BoardConfig,
		from: Position,
		to: Position
	): BoardConfig;

	export function aiMove(
		config: BoardConfig,
		level: AiLevel
	): { [key: Position]: Position[] };
}
