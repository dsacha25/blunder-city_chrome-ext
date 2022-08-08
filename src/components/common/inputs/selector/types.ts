import { PropsWithChildren } from 'react';
import { Control } from 'react-hook-form';

export interface SelectorProps extends PropsWithChildren {
	name: string;
	noBorder?: boolean;
	disabled?: boolean;
	control: Control<any>;
}
