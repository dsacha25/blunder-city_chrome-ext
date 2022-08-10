import React, { FC, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../../../hooks/use-selector/use-selector.hook';
import { selectGameOverState } from '../../../../redux/game/game.selector';
import parseHowGameEnded from '../../../../utils/helpers/parsers/parse-how-game-ended/parse-how-game-ended';
import Paths from '../../../../utils/types/util/paths/paths';
import CustomButton from '../../../common/buttons/custom-button/custom-button.component';
import Title from '../../../common/title/title.styles';
import { GameOverContainer } from './game-over-display.styles';
import { GameOverDisplayProps } from './types';

export const GameOverDisplay: FC<GameOverDisplayProps> = ({ winner }) => {
	const navigate = useNavigate();
	const gameOver = useSelector((state) => selectGameOverState(state));

	return (
		<GameOverContainer>
			{winner && (
				<Title>
					{winner} wins via{' '}
					{gameOver && gameOver.type && (
						<Fragment>{parseHowGameEnded(gameOver.type)}!</Fragment>
					)}
				</Title>
			)}
			{!winner && gameOver && gameOver.type && (
				<Title>{parseHowGameEnded(gameOver.type)}!</Title>
			)}
			<CustomButton
				onClick={() => navigate(`/${Paths.DASHBOARD}`)}
				color="main"
			>
				Play Again?
			</CustomButton>
		</GameOverContainer>
	);
};
