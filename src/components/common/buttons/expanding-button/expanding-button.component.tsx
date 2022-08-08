import React, { FC, useEffect, useState } from 'react';
import {
	ExpandingButtonContainer,
	ExpandableButton,
} from './expanding-button.styles';
import { ExpandingButtonProps } from './types';

const ExpandingButton: FC<ExpandingButtonProps> = (props) => {
	const [hover, setHover] = useState(false);

	useEffect(() => {
		if (props.active) {
			setHover(true);
		} else if (!props.active) {
			setHover(false);
		}
	}, [props.active]);

	const handleMouseEnter = () => {
		setHover(true);
	};

	const handleMouseLeave = () => {
		if (!props.active) {
			setHover(false);
		}
	};

	return (
		<ExpandingButtonContainer
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			hover={hover}
		>
			{hover || props.active ? (
				<ExpandableButton {...props} color="light" hover={hover} {...props}>
					{props.children}
				</ExpandableButton>
			) : (
				<ExpandableButton {...props} color="light" hover={hover}>
					{props.icon}
				</ExpandableButton>
			)}
		</ExpandingButtonContainer>
	);
};

export default ExpandingButton;
