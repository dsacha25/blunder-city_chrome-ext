import React from 'react';
import { useNavigate } from 'react-router-dom';
import Paths from '../../../../utils/types/util/paths/paths';
import {
	ActiveGameErrorContainer,
	GameErrorMessage,
	ReturnButton,
} from './active-game-error.styles';
import { IoReturnDownBackOutline } from 'react-icons/io5';

const ActiveGameError = () => {
	const navigate = useNavigate();

	return (
		<ActiveGameErrorContainer>
			<GameErrorMessage>
				Current game not found
				<br />
				Please return to dashboard!
			</GameErrorMessage>
			<ReturnButton
				color="main"
				onClick={() => {
					navigate(`/${Paths.DASHBOARD}`);
				}}
			>
				<IoReturnDownBackOutline size="50px" />
			</ReturnButton>
		</ActiveGameErrorContainer>
	);
};

export default ActiveGameError;
