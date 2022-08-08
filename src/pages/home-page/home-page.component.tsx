import { User } from 'firebase/auth';
import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ImageContainer from '../../components/common/image-container/image-container.component';
import { RootState } from '../../redux/root-reducer';
import Paths from '../../utils/types/util/paths/paths';
import { HomeIconWrapper, HomePageContainer } from './home-page.styles';
import QueenIcon from '../../assets/logo-icon/queen_icon.png';
import Title from '../../components/common/title/title.styles';
import LogInForm from '../../components/log-in-form/log-in-form.component';

const HomePage = (props: { user: User | null }) => {
	return props.user ? (
		<Navigate to={`/${Paths.DASHBOARD}`} />
	) : (
		<HomePageContainer>
			<HomeIconWrapper>
				<ImageContainer url={QueenIcon} />
			</HomeIconWrapper>
			<Title margin="0" fontWeight="800" fontSize="40px" letterSpacing="0.5rem">
				Blunder City
			</Title>
			<LogInForm />
		</HomePageContainer>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		user: state.user.auth,
	};
};

export default connect(mapStateToProps)(HomePage);
