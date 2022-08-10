import styled from 'styled-components';
import { SpinnerProps } from './types';

export const SpinnerOverlay = styled.div<SpinnerProps>`
	display: grid;
	width: ${({ width }) => (width ? width : '100%')};
	height: ${({ height }) => (height ? height : '100%')};
	place-items: center;
`;

export const SpinnerContainer = styled.div<SpinnerProps>`
	display: inline-block;
	width: ${({ size }) => (size ? size : '50px')};
	height: ${({ size }) => (size ? size : '50px')};

	border: 3px solid rgba(195, 195, 195, 0.6);
	border-radius: 50%;
	border-top-color: #373a3b;

	will-change: transform;

	@keyframes spin {
		to {
			transform: rotate(360deg);
			-webkit-transform: rotate(360deg);
		}
	}

	@-webkit-keyframes spin {
		to {
			transform: rotate(360deg);
			-webkit-transform: rotate(360deg);
		}
	}

	animation: spin 1s ease-in-out infinite;
	-webkit-animation: spin 1s ease-in-out infinite;
`;
