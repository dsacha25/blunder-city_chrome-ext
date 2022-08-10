import {
	format,
	formatDistanceToNow,
	isToday,
	secondsToMilliseconds,
} from 'date-fns';
import { Timestamp } from 'firebase/firestore';

const formatTimestamp = (
	time: Date | Timestamp,
	timeFormat: string
): string => {
	// HANDLE DATES
	if (time instanceof Date) {
		return isToday(time) ? formatDistanceToNow(time) : format(time, timeFormat);
	} else {
		// HANDLE FIREBASE TIMESTAMPS
		return isToday(secondsToMilliseconds(time.seconds))
			? formatDistanceToNow(secondsToMilliseconds(time.seconds))
			: format(secondsToMilliseconds(time.seconds), timeFormat);
	}
};

export default formatTimestamp;
