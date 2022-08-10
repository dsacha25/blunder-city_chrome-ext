import React, { MouseEvent } from 'react';
import useActions from '../../../../hooks/use-actions/use-actions.hook';
import Title from '../../../common/title/title.styles';
import {
	PromotionButton,
	PromotionSelectorContainer,
} from './promotion-selector.styles';
import { PromotionPieces } from '../../../../utils/types/chess/promotion-pieces/promotion-pieces';
import {
	FaChessQueen,
	FaChessRook,
	FaChessBishop,
	FaChessKnight,
} from 'react-icons/fa';

const PromotionSelector = () => {
	const { setPromotionPieceType } = useActions();
	const handlePromotionSelection = (e: MouseEvent<HTMLButtonElement>) => {
		const id = e.currentTarget.id as PromotionPieces;
		setPromotionPieceType(id);
	};

	return (
		<PromotionSelectorContainer>
			<Title>Promote Piece</Title>
			<PromotionButton onClick={handlePromotionSelection} id="q" color="main">
				<FaChessQueen size="50px" />
			</PromotionButton>
			<PromotionButton onClick={handlePromotionSelection} id="r" color="main">
				<FaChessRook size="50px" />
			</PromotionButton>
			<PromotionButton onClick={handlePromotionSelection} id="b" color="main">
				<FaChessBishop size="50px" />
			</PromotionButton>
			<PromotionButton onClick={handlePromotionSelection} id="n" color="main">
				<FaChessKnight size="50px" />
			</PromotionButton>
		</PromotionSelectorContainer>
	);
};

export default PromotionSelector;
