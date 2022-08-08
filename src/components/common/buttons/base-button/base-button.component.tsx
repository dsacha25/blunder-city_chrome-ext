import React, { FC } from 'react';
import BaseButtonMain from './base-button.styles';
import BaseButtonProps from './types';

const BaseButton: FC<BaseButtonProps> = (props) => {
	return <BaseButtonMain {...props}>{props.children}</BaseButtonMain>;
};

export default BaseButton;
