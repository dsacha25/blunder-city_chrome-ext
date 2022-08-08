import { PropsWithChildren } from 'react';

export interface ImageContainerProps extends PropsWithChildren {
	url?: string | null;
	width?: string;
	height?: string;
	backgroundColor?: string;
	maxWidth?: string;
	maxHeight?: string;
	minWidth?: string;
	minHeight?: string;
	radius?: string;
}
