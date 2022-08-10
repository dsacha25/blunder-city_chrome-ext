import styled from 'styled-components';
import ImageContainer from '../../../common/image-container/image-container.component';

export const PlayerChipContainer = styled.div`
	display: grid;
	width: 340px;
	height: 100%;

	position: relative;
	place-items: flex-start center;
	margin: 0 10px;
`;

export const PlayerChipAvatar = styled(ImageContainer)`
	width: 54px;
	height: 54px;
	border-radius: 0.5rem;
	justify-self: flex-end;
	z-index: 1;
	border: 2px solid ${({ theme }) => theme.main};
	background-color: ${({ theme }) => theme.main};
`;

export const PlayerChipInfo = styled.div`
	display: grid;
	width: inherit;
	height: 40px;
	justify-self: flex-end;
	place-items: center flex-start;

	grid-template-columns: auto auto 1fr;
	grid-gap: 10px;
	padding: 0 18px;

	position: absolute;
	right: 30px;

	color: ${({ theme }) => theme.light};
	background-color: ${({ theme }) => theme.accent};
	border: 1px solid ${({ theme }) => theme.main};

	border-radius: 0.4rem;

	z-index: 0;
`;

export const ChipUserName = styled.p`
	font-weight: 200;
	font-size: 14px;
	margin: 0;
	color: ${({ theme }) => theme.white};
`;

export const ChipRating = styled.p`
	font-weight: 600;
	font-size: 16px;
	margin: 0;
	color: ${({ theme }) => theme.white};
`;

export const GameTimeLeft = styled.p`
	font-weight: 300;
	font-size: 16px;
	margin: 0;
	color: ${({ theme }) => theme.white};
`;
