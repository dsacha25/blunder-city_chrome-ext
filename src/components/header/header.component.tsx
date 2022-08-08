import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useActions from '../../hooks/use-actions/use-actions.hook';
import { RootState } from '../../redux/root-reducer';
import { UserState } from '../../redux/user/user.reducer';
import Paths from '../../utils/types/util/paths/paths';
import {
	Avatar,
	HeaderContainer,
	LogOutButton,
	LogOutContainer,
} from './header.styles';

export enum Sender {
	React,
	Content,
}

const Header = (props: { user: UserState }) => {
	const navigate = useNavigate();
	const { logInUserStart } = useActions();

	const handleLogIn = () => {
		logInUserStart({
			email: 'dsacha@aol.com',
			password: 'asdqwe',
		});

		setTimeout(() => {
			navigate(`/${Paths.DASHBOARD}`);
		}, 1000);
	};

	return createPortal(
		<HeaderContainer>
			<LogOutContainer>
				<LogOutButton onClick={handleLogIn} color="secondary">
					Log In
				</LogOutButton>
				<Avatar url={props.user.auth?.photoURL} />
			</LogOutContainer>
		</HeaderContainer>,
		document.getElementById('portal') as HTMLElement
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps)(Header);
