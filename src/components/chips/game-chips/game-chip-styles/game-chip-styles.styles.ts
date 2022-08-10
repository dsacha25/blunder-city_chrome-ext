import styled from 'styled-components';
import ImageContainer from '../../../common/image-container/image-container.component';
import { GameChipProps } from './types';

export const ChipContainer = styled.div<GameChipProps>`
	display: grid;
	width: 300px;
	height: 100%;

	position: relative;
	place-items: ${({ opponent }) => (opponent ? 'flex-end' : 'flex-start')}
		center;
	margin: 0 10px;
`;

export const ChipAvatar = styled(ImageContainer)<GameChipProps>`
	width: 46px;
	height: 46px;
	border-radius: 0.5rem;
	justify-self: ${({ opponent }) => (opponent ? 'flex-start' : 'flex-end')};
	z-index: 1;
	border: 2px solid ${({ theme }) => theme.main};
	background-color: ${({ theme }) => theme.main};
`;

export const AiAvatar = styled.div<GameChipProps>`
	display: grid;
	place-items: center;
	width: 54px;
	height: 54px;
	border-radius: 0.5rem;
	justify-self: ${({ opponent }) => (opponent ? 'flex-start' : 'flex-end')};
	z-index: 1;
	border: 2px solid ${({ theme }) => theme.main};
	background-color: ${({ theme }) => theme.main};
`;

export const PlayerInfo = styled.div<GameChipProps>`
	display: grid;
	width: inherit;
	height: 30px;
	justify-self: flex-end;
	place-items: center
		${({ opponent }) => (opponent ? 'flex-end' : 'flex-start')};

	grid-template-columns: ${({ opponent }) =>
		opponent ? '1fr auto auto' : 'auto auto 1fr'};
	grid-gap: 10px;
	padding: 0 18px;

	position: absolute;

	${({ opponent }) => (opponent ? 'left: 30px' : 'right: 30px')};

	color: ${({ theme }) => theme.light};
	background-color: ${({ theme, opponent }) =>
		opponent ? theme.secondary : theme.accent};
	border: 1px solid ${({ theme }) => theme.main};

	border-radius: 0.4rem;

	z-index: 0;
`;

export const PlayerName = styled.p`
	font-weight: 200;
	font-size: 12px;
	margin: 0;
	color: ${({ theme }) => theme.white};
`;

export const PlayerRating = styled.p`
	font-weight: 600;
	font-size: 14px;
	margin: 0;
	color: ${({ theme }) => theme.white};
`;
