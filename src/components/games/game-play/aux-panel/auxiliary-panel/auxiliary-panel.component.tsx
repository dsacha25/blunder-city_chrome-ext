import React, { memo, MouseEvent, useEffect, useRef, useState } from 'react';
import Title from '../../../../common/title/title.styles';
import {
	AuxiliaryPanelContainer,
	PanelButton,
	PanelControlsContainer,
	PanelInfoContainer,
} from './auxiliary-panel.styles';

import {
	selectGameLoadingState,
	selectIsGameOver,
	selectPendingMove,
	selectTurns,
} from '../../../../../redux/game/game.selector';
import useActions from '../../../../../hooks/use-actions/use-actions.hook';
import GameHistory from '../history/game-history/game-history.component';
import { AuxActions } from './types';
import ConfirmActionPrompt from '../confirm-action-prompt/confirm-action-prompt.component';
import useSelector from '../../../../../hooks/use-selector/use-selector.hook';
import { RootState } from '../../../../../redux/root-reducer';
import { chunk } from 'lodash';
import { connect } from 'react-redux';
import { HistoryMove } from '../../../../../utils/types/chess/history-move/history-move';
import { ChessMove } from '../../../../../utils/types/chess/chess-move/chess-move';

const AuxiliaryPanel = (props: {
	history: HistoryMove[][];
	pendingMove: ChessMove | null;
	loading: boolean;
	isGameOver?: boolean;
}) => {
	const { history, pendingMove, loading, isGameOver } = props;

	const [action, setAction] = useState<AuxActions>(AuxActions.MOVE);
	const [open, setOpen] = useState(false);
	const historyRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (historyRef.current) {
			historyRef.current.scrollTop = historyRef.current.scrollHeight;
		}
	}, [historyRef]);

	const { makeConfirmedMoveStart, cancelPendingMove } = useActions();

	const handleConfirmAction = () => {
		setAction(AuxActions.MOVE);
		switch (action) {
			case AuxActions.RESIGN:
			case AuxActions.DRAW:
			case AuxActions.MOVE:
			default:
				setOpen(false);
				return makeConfirmedMoveStart();
		}
	};

	const handleRejectAction = () => {
		setAction(AuxActions.MOVE);
		switch (action) {
			case AuxActions.RESIGN:
			case AuxActions.DRAW:
				return setOpen(false);
			case AuxActions.MOVE:
			default:
				return cancelPendingMove();
		}
	};

	const handleOpenActionConfirmation = (e: MouseEvent<HTMLButtonElement>) => {
		const id = e.currentTarget.id;
		setOpen(true);

		if (id === 'resign') {
			setAction(AuxActions.RESIGN);
		}

		if (id === 'draw') {
			setAction(AuxActions.DRAW);
		}
	};

	useEffect(() => {
		if (pendingMove) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [pendingMove]);

	//// TODO:
	// * Handle Analysis Page layout

	return (
		<AuxiliaryPanelContainer>
			<Title margin="0" fontSize="30px" color="light">
				Move List
			</Title>
			<PanelInfoContainer ref={historyRef}>
				<GameHistory history={history} />
			</PanelInfoContainer>

			<PanelControlsContainer>
				<PanelButton
					id="resign"
					color="secondary"
					onClick={handleOpenActionConfirmation}
					disabled={action === AuxActions.RESIGN || isGameOver}
				>
					Resign
				</PanelButton>
				<PanelButton
					id="draw"
					color="main"
					onClick={handleOpenActionConfirmation}
					disabled={action === AuxActions.DRAW || isGameOver}
				>
					Draw
				</PanelButton>
			</PanelControlsContainer>

			{open && (
				<ConfirmActionPrompt
					handleConfirm={handleConfirmAction}
					handleReject={handleRejectAction}
					loading={loading}
				/>
			)}
		</AuxiliaryPanelContainer>
	);
};

const mapStateToProps = ({ game }: RootState) => ({
	history: chunk(game.activeGame?.moves, 2),
	pendingMove: game.pendingMove,
	loading: game.loading,
	isGameOver: game.activeGame?.gameOver.isGameOver,
});

export default memo(connect(mapStateToProps)(AuxiliaryPanel));
