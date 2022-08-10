import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/common/buttons/custom-button/custom-button.component';
import Title from '../../components/common/title/title.styles';
import ActiveGamesList from '../../components/games/active-games/active-games-list/active-games-list.component';
import useActions from '../../hooks/use-actions/use-actions.hook';
import { PageContainer } from '../page-styles/page-styles';

const DashboardPage = () => {
	const { openActiveGamesListener, closeActiveGamesListener } = useActions();

	useEffect(() => {
		openActiveGamesListener();

		return () => {
			closeActiveGamesListener();
		};
		// eslint-disable-next-line
	}, []);

	return (
		<PageContainer>
			<Title fontSize="30px">Dashboard Page</Title>
			<ActiveGamesList />
		</PageContainer>
	);
};

export default DashboardPage;
