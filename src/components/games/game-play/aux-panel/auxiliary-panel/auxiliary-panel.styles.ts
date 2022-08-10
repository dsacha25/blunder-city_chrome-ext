import styled from 'styled-components';
import CustomButton from '../../../../common/buttons/custom-button/custom-button.component';
import {
	StarBorder,
	StarBorderFilled,
} from '../../../../common/border-styles/border-styles';

export const AuxiliaryPanelContainer = styled.div`
	display: grid;
	width: 100%;
	height: 90%;

	place-items: flex-start;
	align-self: center;

	${StarBorder};

	padding: 30px;

	grid-template-rows: auto 1fr auto;

	color: ${({ theme }) => theme.main};

	h2 {
		color: ${({ theme }) => theme.main};
	}

	grid-gap: 20px;

	@media screen and (max-width: 980px) {
		height: calc(100vh - 70px);

		border-radius: 0;
	}
`;

export const PanelInfoContainer = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	overflow-y: auto;

	${StarBorderFilled};

	border-top: 1px solid ${({ theme }) => theme.main};
	border-bottom: 1px solid ${({ theme }) => theme.main};
`;

export const PanelControlsContainer = styled.div`
	display: grid;
	width: 100%;
	height: 100%;

	padding: 0 10px;

	max-width: 340px;

	grid-template-columns: 1fr 1fr 50px;

	border-radius: 30px;

	place-items: flex-start space-between;

	grid-gap: 20px;
`;

export const PanelButton = styled(CustomButton)`
	width: 100%;
	padding: unset;
	height: 50px;
	font-size: 15px;
	margin: 0;
	font-weight: 200;

	border-radius: 6px;

	svg {
		margin-top: 2px;
	}
	position: relative;
`;

export const ConfirmActionContainer = styled.div`
	display: grid;
	width: 100%;
	height: 60px;
	grid-template-columns: 1fr 1fr;
	place-items: center;

	@media screen and (max-width: 980px) {
		margin: 20px;
		width: unset;
	}
`;

export const ConfirmActionButton = styled(CustomButton)`
	width: 100%;
	height: 60px;

	border-top-left-radius: 0.5rem;
	border-bottom-left-radius: 0.5rem;
	border-top-right-radius: 0px;
	border-bottom-right-radius: 0px;

	place-content: center;

	margin: 0;
`;

export const RejectActionButton = styled(CustomButton)`
	width: 100%;
	height: 60px;

	border-top-left-radius: 0px;
	border-bottom-left-radius: 0px;
	border-top-right-radius: 0.5rem;
	border-bottom-right-radius: 0.5rem;

	place-content: center;

	margin: 0;
`;
