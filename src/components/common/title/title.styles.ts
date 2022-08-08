import styled from 'styled-components';
import { StyleTypes } from '../buttons/base-button/types';

const Title = styled.h2<StyleTypes>`
	display: grid;
	align-items: center;

	height: ${({ height }) => height};
	font-size: ${({ fontSize }) => (fontSize ? fontSize : '58px')};
	font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 200)};
	text-transform: ${({ transform }) => (transform ? transform : 'uppercase')};
	letter-spacing: ${({ letterSpacing }) =>
		letterSpacing ? letterSpacing : '0.2rem'};

	margin: ${({ margin }) => margin};

	white-space: nowrap;

	color: ${({ theme, color }) => (color ? theme[color] : theme.main)};
`;

export default Title;
