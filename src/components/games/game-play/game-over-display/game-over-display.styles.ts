import styled from 'styled-components';
import { StarBorderFilled } from '../../../common/border-styles/border-styles';

export const GameOverContainer = styled.div`
	display: grid;

	width: 90%;
	height: 250px;

	${StarBorderFilled};

	text-align: center;
	place-content: center;
	position: absolute;

	z-index: 5;

	h2 {
		font-size: 1.5rem;
		white-space: pre-wrap;
	}

	@media screen and (max-width: 1300px) {
		h2 {
			font-size: 1.6rem;
		}
	}
`;
