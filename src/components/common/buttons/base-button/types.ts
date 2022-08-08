import { ComponentPropsWithRef, FormEvent, ReactNode } from 'react';

export type ButtonColors = 'main' | 'light' | 'secondary' | 'grey' | 'warn';

export interface StyleTypes {
	size?: string;
	width?: string | number;
	height?: string | number;
	fontSize?: string;
	fontWeight?: string | number;
	letterSpacing?: string;
	color?: ButtonColors;
	backgroundColor?: string;
	padding?: string;
	margin?: string;
	maxWidth?: string;
	maxHeight?: string;
	minWidth?: string;
	minHeight?: string;
	active?: boolean;
	inverted?: boolean;
	borderless?: boolean;
	transform?: string;
}

type Click =
	| (() => void)
	| ((e: FormEvent<HTMLButtonElement>) => void)
	| Promise<void>;

export interface BaseButtonProps extends ComponentPropsWithRef<'button'> {
	disabled?: boolean;
	children?: ReactNode;
	hidden?: boolean;
	size?: string;
	width?: string | number;
	height?: string | number;
	fontSize?: string;
	fontWeight?: string | number;
	letterSpacing?: string;
	color?: ButtonColors;
	backgroundColor?: string;
	padding?: string;
	margin?: string;
	maxWidth?: string;
	maxHeight?: string;
	minWidth?: string;
	minHeight?: string;
	active?: boolean;
	inverted?: boolean;
	borderless?: boolean;
	flex?: string;
	hover?: boolean;
}

export default BaseButtonProps;
