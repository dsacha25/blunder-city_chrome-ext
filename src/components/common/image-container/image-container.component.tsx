import React, { FC } from 'react';

import { Image } from './image-container.styles';
import { ImageContainerProps } from './types';

const ImageContainer: FC<ImageContainerProps> = (props) => {
	return <Image {...props}>{props.children}</Image>;
};

export default ImageContainer;
