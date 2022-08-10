// import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Square } from 'chess.js';
import { CSSProperties } from 'styled-components';

export type SquareStyles = {
	[square in Square]?: CSSProperties;
};
