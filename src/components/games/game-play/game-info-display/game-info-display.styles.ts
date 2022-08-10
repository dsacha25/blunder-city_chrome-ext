import styled from 'styled-components';
import {
	StarBorderBottom,
	StarBorderFilled,
} from '../../../common/border-styles/border-styles';

export const GameInfoDisplayContainer = styled.div`
	display: grid;
	width: 100%;
	height: 80px;

	place-self: center;
	place-items: center;

	${StarBorderBottom};
`;

export const TimerContainer = styled.div`
	display: grid;
	place-items: center;
	width: 200px;

	${StarBorderFilled};
`;

export const GameTime = styled.p`
	font-size: 24px;
	font-weight: 800;
	margin: 10px;
	padding: 0;
`;
