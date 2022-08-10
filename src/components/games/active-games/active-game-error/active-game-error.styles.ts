import styled from 'styled-components';
import CustomButton from '../../../common/buttons/custom-button/custom-button.component';

export const ActiveGameErrorContainer = styled.div`
	display: grid;
	place-items: center;
	place-content: center;
	width: 700px;
	height: 700px;

	margin: 20px;
	padding: 20px;

	place-self: center;
	justify-self: center;

	background-color: ${({ theme }) => theme.warn};

	border-radius: 60px;

	@media screen and (max-width: 980px) {
		width: 94vw;
		height: 400px;
	}
`;

export const GameErrorMessage = styled.p`
	font-size: 20px;
	place-self: center;
	text-align: center;
	font-weight: 600;
	text-transform: uppercase;
`;

export const ReturnButton = styled(CustomButton)`
	width: 200px;
	height: 60px;

	border-radius: 30px;
`;
