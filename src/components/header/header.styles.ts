import styled from 'styled-components';
import CustomButton from '../common/buttons/custom-button/custom-button.component';
import ImageContainer from '../common/image-container/image-container.component';

export const HeaderContainer = styled.div`
	display: grid;
	width: 140px;

	place-items: flex-start center;

	position: absolute;
	right: 20px;
	top: 20px;

	grid-gap: 10px;
	margin-right: 30px;
	z-index: 10;
`;

export const LogOutContainer = styled.div`
	display: grid;
	height: 50px;
	width: 100%;

	grid-template-columns: 1fr auto;

	border-radius: 0.5rem;

	gap: 4px;

	place-items: center;
	place-content: center;

	border: 4px solid ${({ theme }) => theme.secondary};
	background-color: ${({ theme }) => theme.secondary};
	z-index: inherit;
`;

export const Avatar = styled(ImageContainer)`
	width: 44px;
	height: 44px;
	border-radius: 0.4rem;

	grid-column: 2 / 3;

	z-index: 2;
`;

export const AuthButton = styled(CustomButton)`
	width: 100px;
	height: 44px;

	background-color: ${({ theme }) => theme.secondary};

	border-radius: 0.4rem;

	grid-column: 1 / 2;

	font-size: 10px;
	margin: 0;
	padding: 0;

	place-items: center;

	z-index: 1;
`;
