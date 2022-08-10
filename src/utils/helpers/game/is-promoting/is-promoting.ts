import { Piece } from 'chessboardjsx';

const isPromoting = (row: string, piece: Piece): boolean => {
	const side = piece[0];
	const pieceType = piece[1];

	if (side === 'b' && pieceType === 'P' && row === '1') {
		return true;
	}

	if (side === 'w' && pieceType === 'P' && row === '8') {
		return true;
	}

	return false;
};

export default isPromoting;
