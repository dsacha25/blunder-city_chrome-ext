import styled, { css } from 'styled-components';

import BaseButtonProps from './types';

const dimensionStyles = css<BaseButtonProps>`
	width: ${({ width, size }) => (size ? size : width)};
	height: ${({ height, size }) => (size ? size : height)};
`;

export const buttonFontBase = css<BaseButtonProps>`
	font-family: 'Lexend Peta', sans-serif;
	text-transform: uppercase;

	font-size: ${({ fontSize }) => (fontSize ? fontSize : '20px')};
	font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 800)};
	letter-spacing: ${({ letterSpacing }) =>
		letterSpacing ? letterSpacing : '0.1rem'};

	white-space: nowrap;
`;

//// <<== BUTTON STATE
const buttonState = css<BaseButtonProps>`
	:focus {
		border: 2px solid;
	}

	:active {
		transform: scale(0.95);
	}

	:hover {
	}

	:disabled {
		background-color: ${({ theme }) => theme.border} !important;
		color: ${({ theme }) => theme.grey};
		cursor: unset;
		border: unset !important;
		transform: unset;

		:hover {
			border: unset !important;
			color: ${({ theme }) => theme.grey} !important;
		}
	}
`;

export const BaseButtonMain = styled.button<BaseButtonProps>`
	display: grid;
	place-items: center;
	min-width: ${({ minWidth }) => minWidth};
	min-height: ${({ minHeight }) => minHeight};
	height: 60px;

	margin: ${({ margin }) => (margin ? margin : '0px')};
	padding: ${({ padding }) => (padding ? padding : 'auto')};
	border: ${({ borderless }) => (borderless ? 'none !important' : 'none')};
	border-radius: 0.5rem;
	background: none;
	outline: none;

	cursor: pointer;

	transition: all 250ms ease;
	transform-origin: center;
	will-change: transform, font-weight;

	flex: ${({ flex }) => flex};

	${dimensionStyles};
	${buttonFontBase};
	${buttonState};

	pointer-events: all !important;
`;

export default BaseButtonMain;
