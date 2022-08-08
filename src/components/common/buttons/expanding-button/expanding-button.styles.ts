import styled, { css } from 'styled-components';
import CustomButton from '../custom-button/custom-button.component';

export interface ExpandingButtonStyleProps {
	hover?: boolean;
}

const colapsedStyles = css`
	width: 50px !important;
	max-width: 50px !important;
	height: 50px !important;
`;

const expandedStyles = css`
	width: 160px !important;
	height: 50px !important;
`;

export const ExpandingButtonContainer = styled.div<ExpandingButtonStyleProps>`
	display: grid;
	place-content: center;
	place-items: center;
	background-color: ${({ theme }) => theme.light};
	transition: all 0.2s ease-out;

	border-radius: 0.5rem;

	${({ hover }) => (hover ? expandedStyles : colapsedStyles)};
	z-index: 1;
	margin: 20px;
`;

export const ExpandableButton = styled(CustomButton)`
	display: grid;

	border-radius: 0.5rem;
	margin: 0;
	place-content: center;

	font-size: 14px;

	${({ hover }) => (hover ? expandedStyles : colapsedStyles)};

	transition: all 0.4s ease-in;
`;
