import React, { Fragment, memo } from 'react';
import AuxiliaryPanel from '../../aux-panel/auxiliary-panel/auxiliary-panel.component';
import OnlineChessboard from '../../boards/online-chessboard/online-chessboard.component';

const DesktopGameLayout = () => {
	return (
		<Fragment>
			<OnlineChessboard />
			<AuxiliaryPanel />
		</Fragment>
	);
};

export default memo(DesktopGameLayout);
