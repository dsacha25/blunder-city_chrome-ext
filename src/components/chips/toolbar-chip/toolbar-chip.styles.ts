import styled from 'styled-components';
import ImageContainer from '../../common/image-container/image-container.component';

export const ToolbarChipContainer = styled.div`
	display: grid;
	width: 100%;
	height: 100px;

	position: relative;
`;

export const ChipAvatar = styled(ImageContainer)`
	width: 100px;
	height: 100px;
	border-radius: 0.5rem;
	justify-self: flex-start;
	z-index: 1;
	border: 2px solid ${({ theme }) => theme.main};
	background-color: ${({ theme }) => theme.main};
`;

export const ChipInfoContianer = styled.div`
	display: grid;
	width: 100%;
	max-width: 320px;
	height: 60px;
	justify-self: flex-end;
	place-items: center flex-end;

	grid-template-columns: 1fr auto;
	grid-gap: 10px;
	padding: 0 18px;

	position: absolute;
	left: 50px;

	color: ${({ theme }) => theme.light};
	background-color: ${({ theme }) => theme.main};

	border-top-right-radius: 0.5rem;
	border-bottom-right-radius: 0.5rem;

	z-index: 0;
`;

export const UserName = styled.p`
	font-weight: 200;
	font-size: 14px;
	margin: 0;
`;

export const Rating = styled.p`
	font-weight: 600;
	font-size: 20px;
	margin: 0;
	color: ${({ theme }) => theme.white};
`;
