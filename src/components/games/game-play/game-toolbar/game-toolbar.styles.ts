import styled from 'styled-components';
import CustomButton from '../../../common/buttons/custom-button/custom-button.component';

export const GameToolbarContainer = styled.div`
	display: grid;
	width: 160px;
	height: 50%;
	place-items: center;
	place-self: center;

	padding: 10px;
`;

export const ToolbarButtons = styled(CustomButton)`
	margin: 0;
	padding: 0 10px;
	width: 100%;
`;
