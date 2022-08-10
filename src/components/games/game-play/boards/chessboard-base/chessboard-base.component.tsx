import React, { FC, Fragment, useEffect, useState } from 'react';
import { Square } from 'chess.js';
import Chessboard, { Piece } from 'chessboardjsx';
import globalStyles from '../../../../../global-styles/global-styles';
import useActions from '../../../../../hooks/use-actions/use-actions.hook';

import {
	selectGameWinner,
	selectIsGameOver,
	selectPromotionPieceType,
} from '../../../../../redux/game/game.selector';
import { game } from '../../../../../utils/classes/chess-game/chess-game';
import isPromoting from '../../../../../utils/helpers/game/is-promoting/is-promoting';
import { SquareStyles } from '../../../../../utils/types/chess/square-styles/square-styles';
import { GameOverDisplay } from '../../game-over-display/game-over-display.component';
import PromotionSelector from '../../promotion-selector/promotion-selector.component';
import { ChessboardBaseProps } from './types';
import { RootState } from '../../../../../redux/root-reducer';
import { connect } from 'react-redux';
import Orientation from '../../../../../utils/types/chess/orientation/orientation';
import { PromotionPieces } from '../../../../../utils/types/chess/promotion-pieces/promotion-pieces';

const ChessboardBase = (props: {
	makeMove: (from: Square, to: Square) => void;
	fen: string | undefined;
	playersTurn: boolean;
	orientation: Orientation;
	promotionType: PromotionPieces | null;
	isGameOver?: boolean;
	winner?: Orientation | null;
}) => {
	const {
		makeMove,
		fen,
		playersTurn,
		orientation,
		promotionType,
		isGameOver,
		winner,
	} = props;

	// ==== HOOK
	const { clearPromotionPieceType, setFen, movePiece, makePendingMove } =
		useActions();

	// ==== REDUX STATE
	const gameType = 'online';

	// ==== LOCAL STATE
	const [storedMove, setStoredMove] = useState<{
		from: Square;
		to: Square;
	} | null>(null);
	const [squareStyles, setSquareStyles] = useState<SquareStyles>({});
	const [startSquare, setStartSquare] = useState<Square>(); // SQUARE THAT WAS SELECTED - USED FOR STYLING
	const [promoting, setPromoting] = useState(false);
	const [storedPiece, setStoredPiece] = useState<Piece>('wP');
	const [gameOver, setGameOver] = useState(false);

	// ==== PIECE PROMOTION
	useEffect(() => {
		if (!promoting || !promotionType || !storedMove || !fen) return;

		setStoredMove(null);
		clearPromotionPieceType();
		setPromoting(false);

		const chessMove = game.movePieceServer(
			fen,
			storedMove.from,
			storedMove.to,
			promotionType
		);

		if (chessMove) {
			setFen(chessMove.fen);

			const { gameOver } = chessMove;

			if (gameType === 'online') {
				makePendingMove({
					fen: chessMove.fen,
					move: chessMove.san,
					gameOver,
				});
			} else {
				movePiece({ move: chessMove.san, fen: chessMove.fen });
			}
		}

		// eslint-disable-next-line
	}, [promoting, promotionType, storedMove]);

	// ==== STYLING
	useEffect(() => {
		if (fen && startSquare && playersTurn) {
			const moves = game.getMovesToHighlight(fen, startSquare);
			if (moves && moves.length > 0) {
				const highlightStyles = game.highlightSquare(fen, startSquare, moves);
				setSquareStyles({ ...squareStyles, ...highlightStyles });
			}
		} else if (fen) {
			setSquareStyles(game.squareStyling(fen, startSquare));
		}

		// eslint-disable-next-line
	}, [startSquare]);

	// ==== GAME OVER STATE
	useEffect(() => {
		if (gameType === 'online' && isGameOver) {
			setGameOver(true);
		}

		if (fen && game.isGameOver(fen)) {
			if (gameType === 'online' && isGameOver) {
				return setGameOver(game.isGameOver(fen));
			} else if (gameType !== 'online') {
				console.log('GAME TYPE: ', gameType);
				console.log('WINNER: ', game.getWinner(fen));
				return setGameOver(game.isGameOver(fen));
			}

			// UPDATE FIREBASE
		}

		// eslint-disable-next-line
	}, [fen, isGameOver]);

	if (!fen) return null;

	const handleMouseOverSquare = (square: Square) => {
		// IF NOT PLAYERS TURN DO NOTHING
		if (!playersTurn) return;
		// HIGHLIGHT SQUARES
		const movesToHighlight = game.getMovesToHighlight(fen, square);

		// return if no moves available
		if (!movesToHighlight || movesToHighlight.length === 0) return;

		const highlightStyles = game.highlightSquare(fen, square, movesToHighlight);

		setSquareStyles({ ...squareStyles, ...highlightStyles });
	};

	const handleMouseOutSquare = () => {
		setSquareStyles(game.squareStyling(fen, startSquare));
	};

	const handlePieceClick = (piece: Piece) => {
		setStoredPiece(piece);
	};

	const handleSquareClick = (square: Square) => {
		setStartSquare(square);
		setSquareStyles(game.squareStyling(fen, square));
		console.log('SQUARE: ', startSquare);

		const piecePromoting = isPromoting(square[1], storedPiece);

		if (startSquare && startSquare !== square) {
			if (piecePromoting) {
				// SHOW PROMOTION SELECTOR & STORE MOVE
				setPromoting(true);
				setStoredMove({ from: startSquare, to: square });
			} else {
				// MAKE MOVE & CLEAR START SQUARE
				makeMove(startSquare, square);
			}
			setSquareStyles(game.squareStyling(fen, startSquare));
			setStartSquare(undefined);
		}
	};

	const handleDrop = (props: {
		sourceSquare: Square;
		targetSquare: Square;
		piece: Piece;
	}) => {
		const { sourceSquare, targetSquare, piece } = props;

		// CLEAR SELECTION STYLES
		setStartSquare(undefined);
		// IF SAME SQUARE DO NOTHING
		if (sourceSquare === targetSquare) return;

		const piecePromoting = isPromoting(targetSquare[1], piece);

		if (piecePromoting) {
			// SHOW PROMOTION SELECTOR & STORE MOVE
			setPromoting(true);
			setStoredMove({ from: sourceSquare, to: targetSquare });
		} else {
			// MAKE MOVE & CLEAR SELECTION
			makeMove(sourceSquare, targetSquare);
			setSquareStyles({});
		}
	};

	return (
		<Fragment>
			<Chessboard
				draggable
				position={fen}
				orientation={orientation}
				width={500}
				squareStyles={squareStyles}
				lightSquareStyle={{ backgroundColor: globalStyles.white }}
				darkSquareStyle={{ backgroundColor: globalStyles.accent }}
				onMouseOverSquare={handleMouseOverSquare}
				onMouseOutSquare={handleMouseOutSquare}
				onSquareClick={handleSquareClick}
				onPieceClick={handlePieceClick}
				onDrop={handleDrop}
			/>
			{promoting && <PromotionSelector />}
			{gameOver && fen && (
				<GameOverDisplay winner={winner ? winner : game.getWinner(fen)} />
			)}
		</Fragment>
	);
};

const mapStateToProps = ({ game }: RootState) => ({
	promotionType: game.promotionPieceType,
	isGameOver: game.activeGame?.gameOver.isGameOver,
	winner: game.activeGame?.gameOver.winner,
});

export default connect(mapStateToProps)(ChessboardBase);
