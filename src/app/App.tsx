import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from '../pages/home-page/home-page.component';
import DashboardPage from '../pages/dashboard-page/dashboard-page.component';
import Paths from '../utils/types/util/paths/paths';
import Header from '../components/header/header.component';
import { SiteBackground, SiteContainer } from './app.styles';
import PrivateRoute from '../components/common/private-route/private-route.component';
import { RootState } from '../redux/root-reducer';
import { User } from 'firebase/auth';
import { connect } from 'react-redux';
import PlayPage from '../pages/play-page/play-page.component';
import { ChessGameType } from '../utils/types/chess/chess-game-type/chess-game-type';
import parsePlayableGames from '../utils/helpers/parsers/parse-playable-games/parse-playable-games';

function App(props: { user: User | null; playableGames: ChessGameType[] }) {
	const { user, playableGames } = props;
	const navigate = useNavigate();

	useEffect(() => {
		if (process.env.NODE_ENV === 'development') return;

		// if (playableGames.length > 0) {
		// 	chrome.browserAction.setBadgeText({
		// 		text: playableGames.length.toString(),
		// 	});
		// 	chrome.browserAction.setBadgeBackgroundColor({ color: '#c8354f' });
		// } else {
		// 	chrome.browserAction.setBadgeText({});
		// }
	}, [playableGames]);

	useEffect(() => {
		if (!user) {
			navigate(`/`);
		}
	}, []);

	return (
		<SiteContainer>
			<Header />
			<Routes>
				<Route index element={<HomePage />} />
				<Route path={Paths.HOME} element={<HomePage />} />

				<Route path={Paths.DASHBOARD} element={<PrivateRoute />}>
					<Route index element={<DashboardPage />} />
				</Route>

				<Route path={Paths.PLAY} element={<PrivateRoute />}>
					<Route index element={<PlayPage />} />
				</Route>
			</Routes>
			<SiteBackground />
		</SiteContainer>
	);
}

const mapStateToProps = ({ user, game }: RootState) => {
	return {
		user: user.auth,
		playableGames: parsePlayableGames(game.games, user.auth?.uid),
	};
};

export default connect(mapStateToProps)(App);
