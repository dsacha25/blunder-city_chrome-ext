import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/common/buttons/custom-button/custom-button.component';
import Paths from '../../utils/types/util/paths/paths';

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<div>
			<h1>Home Page</h1>

			<CustomButton
				color="main"
				onClick={() => navigate(`/${Paths.DASHBOARD}`)}
			>
				Dashboard
			</CustomButton>
		</div>
	);
};

export default HomePage;
