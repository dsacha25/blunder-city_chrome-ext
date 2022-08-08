import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/common/buttons/custom-button/custom-button.component';

const DashboardPage = () => {
	const navigate = useNavigate();

	return (
		<div>
			<h1>Dashboard Page</h1>
			<CustomButton color="main" onClick={() => navigate('/')}>
				Home
			</CustomButton>
		</div>
	);
};

export default DashboardPage;
