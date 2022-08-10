import React from 'react';
import { useNavigate } from 'react-router-dom';
import Paths from '../../../../utils/types/util/paths/paths';
import { GameToolbarContainer, ToolbarButtons } from './game-toolbar.styles';

const GameToolbar = () => {
	const navigate = useNavigate();

	return (
		<GameToolbarContainer>
			<ToolbarButtons color="secondary">Resign</ToolbarButtons>
			<ToolbarButtons color="light">Draw</ToolbarButtons>
			<ToolbarButtons
				color="main"
				onClick={() => navigate(`/${Paths.DASHBOARD}`)}
			>
				Home
			</ToolbarButtons>
		</GameToolbarContainer>
	);
};

export default GameToolbar;
