import React, { Fragment, useEffect, useState } from 'react';
import {
	selectActiveGame,
	selectGameLoadingState,
	selectPendingMove,
} from '../../../../../redux/game/game.selector';
// import { selectMobileGameIndex } from '../../../../../redux/indexes/indexes.selector';
import ActiveGameError from '../../../active-games/active-game-error/active-game-error.component';
import AuxiliaryPanel from '../../aux-panel/auxiliary-panel/auxiliary-panel.component';
import OnlineChessboard from '../../boards/online-chessboard/online-chessboard.component';
import { MobileGameLayoutContainer } from './mobile-game-layout.styles';
import useActions from '../../../../../hooks/use-actions/use-actions.hook';
import ConfirmActionPrompt from '../../aux-panel/confirm-action-prompt/confirm-action-prompt.component';
import { RootState } from '../../../../../redux/root-reducer';
import { ChessGameType } from '../../../../../utils/types/chess/chess-game-type/chess-game-type';
import { connect } from 'react-redux';
import { ChessMove } from '../../../../../utils/types/chess/chess-move/chess-move';

const MobileGameLayout = (props: {
	activeGame: ChessGameType | null;
	pendingMove: ChessMove | null;
	loading: boolean;
}) => {
	const { activeGame, pendingMove, loading } = props;
	const { makeConfirmedMoveStart, cancelPendingMove } = useActions();
	// const index = useSelector((state) => selectMobileGameIndex(state));
	const index = 0;
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (pendingMove) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [pendingMove]);

	return (
		<MobileGameLayoutContainer>
			{index ? (
				<AuxiliaryPanel />
			) : (
				<Fragment>
					{activeGame ? <OnlineChessboard /> : <ActiveGameError />}
				</Fragment>
			)}
			{open && (
				<ConfirmActionPrompt
					handleConfirm={makeConfirmedMoveStart}
					handleReject={cancelPendingMove}
					loading={loading}
				/>
			)}
		</MobileGameLayoutContainer>
	);
};

const mapStateToProps = (state: RootState) => ({
	activeGame: state.game.activeGame,
	pendingMove: state.game.pendingMove,
	loading: state.game.loading,
});

export default connect(mapStateToProps)(MobileGameLayout);
