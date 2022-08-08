import React, { FC } from 'react';
import { Select, SelectContainer } from './selector.styles';
import { SelectorProps } from './types';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Controller } from 'react-hook-form';

const Selector: FC<SelectorProps> = (props) => {
	return (
		<SelectContainer noBorder={props.noBorder}>
			<Controller
				name={props.name}
				control={props.control}
				render={({ field }) => <Select {...field}>{props.children}</Select>}
			/>
			{!props.disabled && (
				<MdKeyboardArrowDown
					size="40px"
					color="#333333"
					className="select-arrow"
				/>
			)}
		</SelectContainer>
	);
};

export default Selector;
