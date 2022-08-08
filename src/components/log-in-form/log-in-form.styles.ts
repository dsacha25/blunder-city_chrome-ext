import styled from 'styled-components';
import CustomButton from '../common/buttons/custom-button/custom-button.component';

export const LogInFormContainer = styled.form`
	display: grid;
	width: 550px;

	gap: 25px 10px;

	place-items: center;

	grid-template: 1fr 1fr / 1fr auto;
`;

export const LogInButton = styled(CustomButton)`
	height: 50px;
	font-size: 20px;

	grid-column: 2 / span 2;
	grid-row: 1 / span 2;
`;
