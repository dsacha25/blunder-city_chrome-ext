import React, { FC, useEffect, useState } from 'react';
import { ListItemText } from '../../../common/lists/list-item-text/list-item-text.styles';
import {
	ActiveListItem,
	JoinGameButton,
} from './active-games-list-item.styles';
import { ActiveGamesListItemProps } from './types';
import { FaChessKing } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Paths from '../../../../utils/types/util/paths/paths';
// import useActions from '../../../../hooks/use-actions/use-actions.hook';
import getOpponentName from '../../../../utils/helpers/strings/get-opponent-name/get-opponent-name';
import parseGameMode from '../../../../utils/helpers/parsers/parse-game-mode/parse-game-mode';
import PreviewChessboard from '../../game-play/boards/preview-chessboard/preview-chessboard.component';
import parsePlayerSide from '../../../../utils/helpers/parsers/parse-player-side/parse-player-side';
import useActions from '../../../../hooks/use-actions/use-actions.hook';
import { RootState } from '../../../../redux/root-reducer';
import { connect } from 'react-redux';
import { ChessGameType } from '../../../../utils/types/chess/chess-game-type/chess-game-type';

const ActiveGamesListItem = (props: {
	game: ChessGameType;
	uid: string | undefined;
}) => {
	const { game, uid } = props;

	const { setActiveGame } = useActions();
	const navigate = useNavigate();

	const [opponentName, setOpponentName] = useState('');

	useEffect(() => {
		if (uid) {
			setOpponentName(getOpponentName(uid, game));
		}

		// eslint-disable-next-line
	}, []);

	const handleJoinGame = () => {
		// Set active game
		setActiveGame(game);
		// Redirect to /play
		navigate(`/${Paths.PLAY}?game=${game.id}`);
	};

	return (
		<ActiveListItem columns={3} width="auto">
			<ListItemText>{opponentName}</ListItemText>
			<ListItemText>{parseGameMode(game.gameMode)}</ListItemText>
			<PreviewChessboard
				fen={game.fen}
				orientation={parsePlayerSide(game, uid)}
			/>
			<JoinGameButton onClick={handleJoinGame} color="secondary">
				<FaChessKing size="30px" />
			</JoinGameButton>
		</ActiveListItem>
	);
};

const mapStatetoProps = (state: RootState) => ({
	uid: state.user.auth?.uid,
});

export default connect(mapStatetoProps)(ActiveGamesListItem);
