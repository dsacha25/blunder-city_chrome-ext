import { User } from 'firebase/auth';
import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../../redux/root-reducer';

const PrivateRoute = (props: { user: User | null }) => {
	return props.user ? <Outlet /> : <Navigate to="/" />;
};

const mapStateToProps = (state: RootState) => {
	return { user: state.user.auth };
};

export default connect(mapStateToProps)(PrivateRoute);
