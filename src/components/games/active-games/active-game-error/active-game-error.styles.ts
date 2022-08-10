import styled from 'styled-components';
import CustomButton from '../../../common/buttons/custom-button/custom-button.component';

export const ActiveGameErrorContainer = styled.div`
	display: grid;
	place-items: center;
	place-content: center;
	width: 400px;
	height: 100%;

	padding: 20px;

	place-self: center;
	justify-self: center;

	background-color: ${({ theme }) => theme.warn}99;

	border-radius: 0.5rem;
`;

export const GameErrorMessage = styled.p`
	font-size: 14px;
	place-self: center;
	text-align: center;
	font-weight: 600;
	text-transform: uppercase;
`;

export const ReturnButton = styled(CustomButton)`
	width: 200px;
	height: 60px;

	border-radius: 0.5rem;
`;
