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

function App(props: { user: User | null }) {
	const navigate = useNavigate();

	useEffect(() => {
		chrome.browserAction.setBadgeText({ text: '1' });
		chrome.browserAction.setBadgeBackgroundColor({ color: '#c8354f' });
	}, []);

	useEffect(() => {
		if (!props.user) {
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

const mapStateToProps = (state: RootState) => {
	return {
		user: state.user.auth,
	};
};

export default connect(mapStateToProps)(App);
