import React, { FC, memo } from 'react';
import { milliseconds } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Paths from '../../../../utils/types/util/paths/paths';
import CustomButton from '../../../common/buttons/custom-button/custom-button.component';
import Title from '../../../common/title/title.styles';
import { WaitingForOpponentMsgProps } from './types';
import {
	AutoResignContainer,
	AutoResignSpinner,
	WaitingForOpponentContainer,
	WaitingPromptBackdrop,
} from './waiting-for-opponent-msg.styles';
import { CountdownTimeDelta } from 'react-countdown';
import CountdownTimer from '../../../common/countdown-timer/countdown-timer.component';
import useActions from '../../../../hooks/use-actions/use-actions.hook';

const WaitingForOpponentMsg: FC<WaitingForOpponentMsgProps> = ({
	playersPresent,
}) => {
	const navigate = useNavigate();
	// const { autoResignOpponent } = useActions();

	const handleAutoResign = (time: CountdownTimeDelta) => {
		// console.log('TIME: ', time);

		if (time.completed) {
			console.log('Player Resigned');

			// autoResignOpponent();
		}
	};

	return !playersPresent ? (
		<WaitingPromptBackdrop>
			<WaitingForOpponentContainer>
				<Title fontSize="16px">Waiting for opponent...</Title>
				<p>opponent auto resigns in...</p>
				<AutoResignContainer>
					<AutoResignSpinner size="100px" />
					{/* <CountdownTimer
						date={Date.now() + milliseconds({ seconds: 600 })}
						getTime={handleAutoResign}
					/> */}
				</AutoResignContainer>

				<CustomButton
					onClick={() => navigate(`/${Paths.DASHBOARD}`)}
					color="main"
				>
					Return
				</CustomButton>
			</WaitingForOpponentContainer>
		</WaitingPromptBackdrop>
	) : null;
};

export default memo(WaitingForOpponentMsg);
