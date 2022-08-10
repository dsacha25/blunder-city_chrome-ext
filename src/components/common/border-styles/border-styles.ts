import { css } from 'styled-components';
import BorderPattern from '../../../assets/patterns/border-pattern.png';
import BorderPatternFilled from '../../../assets/patterns/border-pattern_filled.png';

export const StarBorder = css`
	border-image: url(${BorderPattern});
	border-image-slice: 106 fill;
	border-image-width: 21px;
	border-image-repeat: repeat;
`;

export const StarBorderBottom = css`
	border-image: url(${BorderPattern});
	border-image-slice: 0 106 106 106 fill;
	border-image-width: 30px;
	border-image-repeat: repeat;
	height: 40px;
`;

export const StarBorderLeft = css`
	border-image: url(${BorderPattern});
	border-image-slice: 106 0 106 106 fill;
	border-image-width: 30px;
	border-image-repeat: repeat;
`;

export const StarBorderRight = css`
	border-image: url(${BorderPattern});
	border-image-slice: 106 106 106 0 fill;
	border-image-width: 30px;
	border-image-repeat: repeat;
`;

export const StarBorderFilled = css`
	border-image: url(${BorderPatternFilled});
	border-image-slice: 106 fill;
	border-image-width: 21px;
	border-image-outset: 10px;
	border-image-repeat: repeat;
`;
