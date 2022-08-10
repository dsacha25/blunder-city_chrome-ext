import Orientation from '../../../types/chess/orientation/orientation';

export const getPlayerOrientation = (
	whiteUID: string,
	uid: string
): Orientation => {
	return whiteUID === uid ? 'white' : 'black';
};
