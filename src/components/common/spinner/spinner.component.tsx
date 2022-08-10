import React, { FC } from 'react';
import { SpinnerContainer, SpinnerOverlay } from './spinner.styles';
import { SpinnerProps } from './types';

const Spinner: FC<SpinnerProps> = (props) => {
	return (
		<SpinnerOverlay {...props}>
			<SpinnerContainer {...props} />
		</SpinnerOverlay>
	);
};

export default Spinner;
