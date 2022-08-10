import styled from 'styled-components';
import CustomButton from '../../../common/buttons/custom-button/custom-button.component';
import { ListItem } from '../../../common/lists/list-item/list-item.styles';
import { PreviewChessboardContainer } from '../../game-play/boards/preview-chessboard/preview-chessboard.styles';

export const ActiveListItem = styled(ListItem)`
	grid-template-columns: 1fr 1fr 120px 100px;
	height: 100px;
	max-width: 50vw;

	@media screen and (max-width: 980px) {
		width: 100%;
		max-width: unset;
		grid-template-columns: 1fr auto;
		grid-template-rows: 1fr 1fr;

		${PreviewChessboardContainer} {
			display: none;
		}
	}
`;

export const JoinGameButton = styled(CustomButton)`
	width: 100%;
	height: 92px;
	border-radius: 0.4rem;
	margin: 0;
	place-content: center;

	@media screen and (max-width: 980px) {
		grid-row: 1 / span 2;
		grid-column: 2 / span 2;
	}
`;
