import styled from 'styled-components';
import { StarBorderFilled } from '../../../common/border-styles/border-styles';
import Spinner from '../../../common/spinner/spinner.component';

export const WaitingPromptBackdrop = styled.div`
	display: grid;
	place-items: center;
	width: 600px;
	height: 600px;
	position: absolute;

	margin: auto;

	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	z-index: 10;
	backdrop-filter: blur(4px);
`;

export const WaitingForOpponentContainer = styled.div`
	display: grid;
	grid-template-rows: auto auto 1fr auto;
	place-items: center;
	width: 400px;
	height: 400px;

	margin: auto;

	z-index: 10;

	${StarBorderFilled};
`;

export const AutoResignContainer = styled.div`
	display: grid;
	place-items: center;
	position: relative;
	width: 100%;
	p {
		color: black !important;
		font-size: 20px;
	}
`;

export const AutoResignSpinner = styled(Spinner)`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
`;
