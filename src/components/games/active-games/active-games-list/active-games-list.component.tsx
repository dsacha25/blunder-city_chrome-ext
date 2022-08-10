import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../../redux/root-reducer';
import { ChessGameType } from '../../../../utils/types/chess/chess-game-type/chess-game-type';
import { List } from '../../../common/lists/list/list.styles';
import Title from '../../../common/title/title.styles';
import ActiveGamesListItem from '../active-games-list-item/active-games-list-item.component';

const ActiveGamesList = (props: { games: ChessGameType[] }) => {
	return (
		<List>
			<Title fontSize="30px">Active Games</Title>
			{props.games.map((game, i) => (
				<ActiveGamesListItem key={i} game={game} />
			))}
		</List>
	);
};

const mapStateToProps = (state: RootState) => ({
	games: state.game.games,
});

export default connect(mapStateToProps)(ActiveGamesList);
