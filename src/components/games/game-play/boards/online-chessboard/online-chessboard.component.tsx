import React, { memo } from 'react';

import { Square } from 'chess.js';
import OpponentChip from '../../../../chips/game-chips/opponent-chip/opponent-chip.component';
import PlayerChip from '../../../../chips/game-chips/player-chip/player-chip.component';
import { game } from '../../../../../utils/classes/chess-game/chess-game';
import useActions from '../../../../../hooks/use-actions/use-actions.hook';
import {
	selectFen,
	selectOrientation,
} from '../../../../../redux/game/game.selector';

import ChessboardBase from '../chessboard-base/chessboard-base.component';
import {
	BoardContainer,
	OpponentContainer,
	PlayerContainer,
} from '../board-styles/board-styles.styles';
import useSelector from '../../../../../hooks/use-selector/use-selector.hook';
import { RootState } from '../../../../../redux/root-reducer';
import Orientation from '../../../../../utils/types/chess/orientation/orientation';
import { connect } from 'react-redux';

const OnlineChessboard = (props: {
	fen: string | undefined;
	orientation: Orientation;
}) => {
	const { fen, orientation } = props;

	const { setFen, makePendingMove } = useActions();

	if (!fen) return null;

	const makeMove = (from: Square, to: Square) => {
		console.log('FROM - TO: ', from, to);
		if (from === to) return;

		let chessMove = game.movePieceServer(fen, from, to);

		if (chessMove === null) return;

		console.log('CHESS MOVE', chessMove);
		if (chessMove.turn !== orientation) {
			const { gameOver, fen, san } = chessMove;

			setFen(chessMove.fen);
			makePendingMove({
				fen,
				move: san,
				gameOver: {
					isGameOver: game.isGameOver(fen),
					winner: gameOver.winner,
					type: gameOver.type,
				},
			});
		}
	};

	return (
		<BoardContainer>
			<OpponentContainer>
				<OpponentChip />
			</OpponentContainer>

			<ChessboardBase
				makeMove={makeMove}
				fen={fen}
				playersTurn={game.getTurn(fen) === orientation}
				orientation={orientation}
			/>

			<PlayerContainer>
				<PlayerChip />
			</PlayerContainer>
		</BoardContainer>
	);
};

const mapStateToProps = (state: RootState) => ({
	fen: state.game.activeGame?.fen,
	orientation: state.game.orientation,
});

export default memo(connect(mapStateToProps)(OnlineChessboard));
