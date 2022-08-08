import styled, { css } from 'styled-components';
import BaseButton from '../base-button/base-button.component';
import BaseButtonProps from '../base-button/types';

const primaryStyles = css`
	background-color: ${({ theme }) => theme.main};

	:focus,
	:hover {
		color: ${({ theme }) => theme.main} !important;
		background-color: white;
		border: 2px solid !important;
	}
`;

const lightStyles = css`
	color: ${({ theme }) => theme.main};
	background-color: ${({ theme }) => theme.light};

	:focus,
	:hover {
		color: ${({ theme }) => theme.light} !important;
		background-color: white;
		border: 2px solid !important;
	}
`;

const secondaryStyles = css`
	background-color: ${({ theme }) => theme.secondary};

	:focus,
	:hover {
		color: ${({ theme }) => theme.secondary} !important;
		background-color: ${({ theme }) => theme.warn}77;
		border: 2px solid !important;
	}
`;

const greyStyles = css`
	background-color: ${({ theme }) => theme.light};

	:focus,
	:hover {
		color: ${({ theme }) => theme.grey} !important;
	}
`;

const warnStyles = css`
	background-color: ${({ theme }) => theme.warn};

	:focus,
	:hover {
		color: ${({ theme }) => theme.white} !important;
		background-color: ${({ theme }) => theme.secondary};
		border: 2px solid black !important;
	}
`;

const borderlessStyles = css`
	border: none !important;
	background-color: transparent !important;

	:hover {
		color: ${({ theme }) => theme.light} !important;
		font-weight: 600 !important;
		border: none !important;
	}

	:active {
		font-weight: unset !important;
	}

	:focus {
		color: ${({ theme }) => theme.light}!important;
		text-shadow: 0 0 4px ${({ theme }) => theme.main} !important;
	}

	:disabled {
		background-color: transparent !important;
	}
`;

const outlineStyles = css<BaseButtonProps>`
	color: ${({ color, theme }) => color && theme[color]} !important;
	border: 2px solid !important;
	background-color: ${({ theme }) => theme.accent} !important;
	font-weight: 600;

	:hover {
		background-color: ${({ color, theme }) => color && theme[color]};
	}

	:focus {
		box-shadow: 0 0 0.25rem 0.15rem
			${({ color, theme }) => color && theme[color]}bf;
	}

	${({ borderless }) => borderless && borderlessStyles};
`;

const ButtonStyles = {
	main: primaryStyles,
	light: lightStyles,
	secondary: secondaryStyles,
	warn: warnStyles,
	grey: greyStyles,
};

export const CustomButtonMain = styled(BaseButton)<BaseButtonProps>`
	/* This button should be able to switch between the button styles 
  This includes 
    - Primary
    - Secondary
    - Grey 
    - Warn
    - Inverted 
    - Borderless
 */
	margin: ${({ margin }) => (margin ? margin : '20px')};
	padding: ${({ padding }) => (padding ? padding : '0 22px')};

	background-color: ${({ theme, color }) => (color ? theme[color] : 'none')};

	color: ${({ color, inverted, theme }) =>
		color && inverted ? theme[color] : 'white'};

	:focus {
		background-color: ${({ theme, color }) =>
			color !== 'main' ? theme.secondary : 'white'};

		border: 2px solid;
	}

	${({ inverted }) => inverted && outlineStyles};

	${({ active }) => active && outlineStyles};

	${({ color }) => color && ButtonStyles[color]};
`;
