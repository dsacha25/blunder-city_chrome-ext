import { ReactNode } from 'react';
import BaseButtonProps from '../base-button/types';

export interface ExpandingButtonProps extends BaseButtonProps {
	hover?: boolean;
	icon: ReactNode;
}
