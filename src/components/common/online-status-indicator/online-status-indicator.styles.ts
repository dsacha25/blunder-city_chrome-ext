import styled, { css } from 'styled-components';
import { OnlineStatusProps } from './types';

const onlineStyles = css`
	background: rgb(0, 196, 11);
	background: radial-gradient(
		circle,
		rgba(0, 196, 11, 1) 40%,
		rgba(245, 247, 245, 1) 60%,
		rgba(0, 196, 11, 1) 70%
	);
`;

const offlineStyles = css`
	background: rgb(160, 160, 160);
	background: radial-gradient(
		circle,
		rgba(160, 160, 160, 1) 40%,
		rgba(245, 247, 245, 1) 60%,
		rgba(160, 160, 160, 1) 70%
	);
`;

const isOnline = ({ online }: OnlineStatusProps) => {
	return online ? onlineStyles : offlineStyles;
};

export const OnlineStatusIndicator = styled.div<OnlineStatusProps>`
	display: grid;

	width: 16px;
	height: 16px;
	border-radius: 8px;

	position: absolute;

	${({ left }) => (left ? 'top: 0px; left: -8px' : 'top: -4px; right: -6px')};

	z-index: 1;

	margin-bottom: auto;
	margin-left: auto;

	${isOnline};
`;
