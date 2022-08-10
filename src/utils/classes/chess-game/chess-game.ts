import { ChessInstance, Square } from 'chess.js';

import Orientation from '../../types/chess/orientation/orientation';

import {
	Game,
	status,
	moves,
	aiMove,
	getFen,
	BoardConfig,
	Turn,
	History,
	ConfigObject,
	Position,
	AiLevel,
} from 'js-chess-engine';
import { keys, values } from 'lodash';
import { PromotionPieces } from '../../types/chess/promotion-pieces/promotion-pieces';
import { SquareStyles } from '../../types/chess/square-styles/square-styles';
import GameOverType from '../../types/chess/game-over/game-over-type/game-over-type';
import GameOverTypes from '../../types/chess/game-over/game-over-types.ts/game-over-types';
import { Chess } from 'chess.js';

const DEFAULT_POSITION =
	'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

interface ServerMove {
	fen: string;
	san: string;
	turn: Orientation;
	gameOver: GameOverType;
}

class ChessGame {
	public game: Game = new Game();
	public chess: ChessInstance = new Chess();
	public squareStyles: SquareStyles = {};
	public boardConfig: BoardConfig = DEFAULT_POSITION;
	public fen: string = DEFAULT_POSITION;
	public hoverColor: string = '#091e3b';
	public moveColor: string = '#bccbf2';

	constructor(config?: BoardConfig) {
		if (config) {
			this.game = new Game(config);
		}
	}

	setFen(config: BoardConfig): string {
		return (this.fen = getFen(config));
	}

	get turn(): Turn {
		return status(this.boardConfig).turn;
	}

	get history(): History {
		return this.getHistory(this.boardConfig);
	}

	get orientation(): Orientation {
		return status(this.boardConfig).turn;
	}

	isGameOver(config: BoardConfig): boolean {
		return status(config).isFinished || status(config).checkMate;
	}

	inCheck(fen: BoardConfig): boolean {
		return status(fen).check;
	}

	inCheckMate(fen: BoardConfig): boolean {
		return status(fen).checkMate;
	}

	inDraw(fen: string): { type: GameOverTypes | null; isGameOver: boolean } {
		this.chess.load(fen);

		/// CHECKMATE / STALEMATE / DRAW
		const draw = this.chess.in_draw();
		const stalemate = this.chess.in_stalemate();
		const insufficient = this.chess.insufficient_material();
		const threefold = this.chess.in_threefold_repetition();

		console.log('DRAW: ', draw);
		console.log('STALEMATE: ', stalemate);
		console.log('INSUFFICIENT: ', insufficient);
		console.log('THREEFOLD: ', threefold);

		if (draw && insufficient) {
			return {
				type: GameOverTypes.DRAW_INSUFFICIENT_MATERIAL,
				isGameOver: true,
			};
		}

		if (draw && threefold) {
			return {
				type: GameOverTypes.DRAW_REPETITION,
				isGameOver: true,
			};
		}

		if (stalemate) {
			return { type: GameOverTypes.DRAW_STALEMATE, isGameOver: true };
		}

		return { type: null, isGameOver: false };
	}

	setGame(config: BoardConfig) {
		this.game = new Game(config);
		this.boardConfig = config;
		this.fen = getFen(config);
		return this.game;
	}

	getTurn(config: BoardConfig): Turn {
		return status(config).turn;
	}

	getStatus(config: BoardConfig): ConfigObject {
		return (this.boardConfig = status(config));
	}

	getHistory(config: BoardConfig): History {
		this.game.getHistory();
		this.chess.load(this.setFen(status(config)));
		this.chess.history({ verbose: true });

		this.setGame(status(config)).getHistory();

		// console.log('CHESS HISTORY: ', this.history);
		// console.log('CHESS STATUS: ', status(config).moves);

		return this.setGame(config).getHistory();
	}

	getWinner(config: BoardConfig): Orientation | null {
		const board = this.getStatus(config);

		if (board.isFinished || board.checkMate) {
			if (board.turn === 'black') {
				return 'white';
			} else if (board.turn === 'white') {
				return 'black';
			}
		}
		return null;
	}

	resetGame(): string {
		this.setGame(DEFAULT_POSITION);

		// console.log('BOARD?: ', this.setGame(DEFAULT_POSITION).board);

		return this.fen;
	}

	getMoves(config: BoardConfig, square: Position): Position[] | undefined {
		return moves(config)[square.toUpperCase()];
	}

	getMovesToHighlight(fen: BoardConfig, square: Square) {
		return this.getMoves(fen, square);
	}

	movePiece(from: Square, to: Square): { [position in Position]: Position } {
		return this.game.move(from, to);
	}

	movePieceServer(
		config: BoardConfig,
		from: Square,
		to: Square,
		promotion?: PromotionPieces
	): ServerMove | null {
		this.chess.load(getFen(config));

		const chessMove = this.chess.move({
			from,
			to,
			promotion: promotion || 'q',
		});

		if (!chessMove) return null;

		// MAKE MOVE
		const fen = this.chess.fen();

		// UPDATE BOARD STATE
		this.chess.load(fen);

		/// CHECKMATE / STALEMATE / DRAW
		const { type, isGameOver } = this.inDraw(fen);
		const gameOver = this.inCheckMate(fen);

		this.getStatus(fen);

		return {
			fen,
			san: chessMove.san,
			turn: this.getStatus(fen).turn,
			gameOver: {
				isGameOver: gameOver || isGameOver,
				winner: !type ? this.getWinner(fen) : null,
				type,
			},
		};
	}

	movePieceAi(level: AiLevel, fen: BoardConfig) {
		const chessMove = aiMove(fen, level);

		const from = keys(chessMove)[0].toLowerCase() as Square;
		const to = values<string>(chessMove)[0].toLowerCase() as Square;

		return this.movePieceServer(fen, from, to);
	}

	squareStyling(
		fen: BoardConfig,
		pieceSquare: Square | undefined
	): SquareStyles {
		const history = this.getHistory(fen);

		const sourceSquare = history.length && history[history.length - 1].from;
		const targetSquare = history.length && history[history.length - 1].to;
		const backgroundColor = this.hoverColor;
		return (this.squareStyles = {
			[pieceSquare ? pieceSquare : '']: { backgroundColor },
			...(history.length && {
				[sourceSquare]: {
					backgroundColor,
				},
			}),
			...(history.length && {
				[targetSquare]: {
					backgroundColor,
				},
			}),
		});
	}

	highlightSquare(
		fen: BoardConfig,
		sourceSquare: Square,
		squaresToHighlight: Square[]
	) {
		this.boardConfig = fen;

		return [
			sourceSquare,
			...squaresToHighlight.map((square) => square.toLowerCase()),
		].reduce((a, c) => {
			return {
				...a,
				...{
					[c]: {
						background: `radial-gradient(circle, ${this.moveColor} 36%, transparent 40%)`,
						borderRadius: '50%',
					},
				},
				...this.squareStyling(fen, sourceSquare),
			};
		}, {});
	}
}

export const game = new ChessGame();

export default ChessGame;
