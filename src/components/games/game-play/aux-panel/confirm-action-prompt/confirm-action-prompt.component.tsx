import React, { FC, memo } from 'react';
import {
	ConfirmActionContainer,
	ConfirmActionButton,
	RejectActionButton,
} from './confirm-action-prompt.styles';
import { FiCheck } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { ConfirmActionPromptProps } from './types';
import Spinner from '../../../../common/spinner/spinner.component';

const ConfirmActionPrompt: FC<ConfirmActionPromptProps> = ({
	handleConfirm,
	handleReject,
	loading,
}) => {
	return (
		<ConfirmActionContainer>
			<ConfirmActionButton onClick={handleConfirm} color="main">
				{loading ? <Spinner size="40px" /> : <FiCheck size="40px" />}
			</ConfirmActionButton>
			<RejectActionButton onClick={handleReject} color="secondary">
				<IoClose size="40px" />
			</RejectActionButton>
		</ConfirmActionContainer>
	);
};

export default memo(ConfirmActionPrompt);
