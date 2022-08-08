import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/common/buttons/custom-button/custom-button.component';
import { RootState } from '../../redux/root-reducer';
import { ChessUser } from '../../utils/types/user/chess-user/chess-user';

const DashboardPage = (props: { user: ChessUser | null }) => {
	const navigate = useNavigate();

	return (
		<div>
			<h1>Dashboard Page</h1>
			{props.user && props.user.email}
		</div>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		user: state.user.user,
	};
};

export default connect(mapStateToProps)(DashboardPage);
