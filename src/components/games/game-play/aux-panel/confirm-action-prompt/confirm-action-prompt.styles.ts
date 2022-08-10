import styled from 'styled-components';
import CustomButton from '../../../../common/buttons/custom-button/custom-button.component';

export const ConfirmActionContainer = styled.div`
	display: grid;
	width: 100%;
	height: 60px;
	grid-template-columns: 1fr 1fr;
	place-items: center;

	@media screen and (max-width: 980px) {
		padding: 10px 20px;
		margin-bottom: 20px;
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
