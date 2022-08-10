import Orientation from '../../../types/chess/orientation/orientation';
import Side from '../../../types/chess/side/side';

const getOrientation = (side: Side): Orientation => {
	return side === 'w' ? 'white' : 'black';
};

export default getOrientation;
