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
import useSelector from '../../../../../hooks/use-selector/use-selector.hook';

const MobileGameLayout = () => {
	const { makeConfirmedMoveStart, cancelPendingMove } = useActions();
	const activeGame = useSelector((state) => selectActiveGame(state));
	// const index = useSelector((state) => selectMobileGameIndex(state));
	const index = 0;
	const pendingMove = useSelector((state) => selectPendingMove(state));
	const loading = useSelector((state) => selectGameLoadingState(state));
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

export default MobileGameLayout;
