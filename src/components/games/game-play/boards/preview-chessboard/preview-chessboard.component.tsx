import Chessboard from 'chessboardjsx';
import React, { FC } from 'react';
import globalStyles from '../../../../../global-styles/global-styles';
import { PreviewChessboardContainer } from './preview-chessboard.styles';
import { PreviewChessboardProps } from './types';

const PreviewChessboard: FC<PreviewChessboardProps> = ({
	fen,
	orientation,
}) => {
	return (
		<PreviewChessboardContainer>
			<Chessboard
				position={fen}
				orientation={orientation}
				width={700}
				lightSquareStyle={{ backgroundColor: globalStyles.white }}
				darkSquareStyle={{ backgroundColor: globalStyles.accent }}
				draggable={false}
				showNotation={false}
				sparePieces={false}
			/>
		</PreviewChessboardContainer>
	);
};

export default PreviewChessboard;
