import styled from 'styled-components';
import CustomButton from '../common/buttons/custom-button/custom-button.component';
import ImageContainer from '../common/image-container/image-container.component';

export const HeaderContainer = styled.div`
	display: grid;
	width: 210px;

	grid-template-columns: auto 150px;
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
	width: 164px;

	grid-template-columns: 1fr auto;

	border-radius: 0.5rem;
	flex: 1;

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

	transform: translate(-4px, 0);
`;

export const LogOutButton = styled(CustomButton)`
	width: 120px;
	height: 44px;

	background-color: ${({ theme }) => theme.secondary};

	border-top-left-radius: 0.2rem;
	border-bottom-left-radius: 0.2rem;
	border-top-right-radius: 0px;
	border-bottom-right-radius: 0px;

	grid-column: 1 / 2;
	transform: translate(0px, 0);

	font-size: 10px;
	margin: 0;
	padding: 0;

	place-items: center flex-start;
	padding-left: 16px;

	z-index: 1;
`;
