import React from 'react';
import { User } from 'firebase/auth';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import useActions from '../../hooks/use-actions/use-actions.hook';
import { RootState } from '../../redux/root-reducer';
import {
	Avatar,
	HeaderContainer,
	AuthButton,
	LogOutContainer,
} from './header.styles';

const Header = (props: { user: User | null }) => {
	const { logOutUserStart } = useActions();

	if (!props.user) return null;

	return createPortal(
		<HeaderContainer>
			<LogOutContainer>
				<AuthButton onClick={logOutUserStart} color="secondary">
					Log Out
				</AuthButton>
				<Avatar url={props.user.photoURL} />
			</LogOutContainer>
		</HeaderContainer>,
		document.getElementById('portal') as HTMLElement
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		user: state.user.auth,
	};
};

export default connect(mapStateToProps)(Header);
