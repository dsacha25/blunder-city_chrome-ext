import styled from 'styled-components';
import { SelectorProps } from './types';

export const SelectContainer = styled.div<Pick<SelectorProps, 'noBorder'>>`
	display: grid;
	position: relative;
	width: 100%;
	height: auto;

	border: ${({ noBorder, theme }) =>
		noBorder ? 'none' : `1px solid ${theme.border.main}`};
	border-radius: 3rem;
	margin: 0;
	background: ${({ theme }) => theme.color.background};
	place-items: center;
	z-index: 0;
	/* overflow: hidden; */

	.select-arrow {
		right: ${({ noBorder }) => (noBorder ? 0 : '20px')};
		position: absolute;
		cursor: pointer;
		z-index: 1;
		pointer-events: none;
	}
`;

export const Select = styled.select`
	display: block;
	width: 100%;
	height: 100%;

	color: #333333;
	font-size: 26px;

	background: ${({ theme }) => theme.color.background};
	border: none;
	border-radius: 3rem;

	padding: 10px 0 10px 20px;

	font-family: mr-eaves-modern, sans-serif;
	font-style: italic;
	line-height: 40px;

	cursor: pointer;
	pointer-events: auto;

	-webkit-appearance: none;

	z-index: 1;

	:disabled {
		background: #44444422;
		border-bottom: unset;
		cursor: unset;
		opacity: unset;
	}

	:focus {
		outline: none;
		background: #fff;
		box-shadow: 0 0 0.25rem 0.15rem ${({ theme }) => theme.color.brightBlue};
	}
`;
